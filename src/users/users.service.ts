import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
  @InjectRepository(Role) private readonly roleRepository: Repository<Role>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
   
      const roleToUser = createUserDto.role_id;
      const role = await this.roleRepository.findOne({where: {id: roleToUser}, relations: []});
      const newUser = this.userRepository.create({ ...createUserDto, role });
      return await this.userRepository.save(newUser);
    
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({where: {id}, relations: ['role', 'orders']});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.softDelete(id);
  }
}
