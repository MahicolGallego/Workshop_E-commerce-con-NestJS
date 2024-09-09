import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from 'src/common/filters/error-manager.filter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const roleToUser = createUserDto.role_id;
    const role = await this.roleRepository.findOne({
      where: { id: roleToUser },
    });
    if (!role) {
      throw new NotFoundException(`The role does not exist`);
    }
    const hashedPassword = await this.encryptPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    const newUser = this.userRepository.create({ ...createUserDto, role });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['role', 'orders'],
      order: { email: 'DESC' },
    });
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'orders'],
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    try {
      const userByUsername = await this.userRepository.findOne({
        where: { name: usernameOrEmail },
      });

      if (userByUsername) {
        return userByUsername;
      }

      const userByEmail = await this.userRepository.findOne({
        where: { email: usernameOrEmail },
      });

      if (userByEmail) {
        return userByEmail;
      }

      throw new ErrorManager({ type: 'NOT_FOUND', message: 'User not found' });
    } catch (error) {
      if (error instanceof Error) {
        throw ErrorManager.createSignatureError(error.message);
      } else {
        throw ErrorManager.createSignatureError(
          'An unexpected error occurred.',
        );
      }
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.softDelete(id);
  }

  private async encryptPassword(password: string) {
    try {
      const saltRounds = this.configService.get<number>('HASH_SALT');
      if (typeof saltRounds !== 'number') {
        throw new ErrorManager({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Invalid salt rounds configuration',
        });
      }
      const passwordEncrypt = await bcrypt.hash(password, saltRounds);
      return passwordEncrypt;
    } catch (error) {
      if (error instanceof Error) {
        throw ErrorManager.createSignatureError(error.message);
      } else {
        // Manejo para errores inesperados que no sean instancias de Error
        throw ErrorManager.createSignatureError('An unexpected error occurred');
      }
    }
  }
}
