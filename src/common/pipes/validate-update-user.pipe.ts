import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateUpdateUserPipe implements PipeTransform{
    transform(requestData: any) {
        if(requestData.role_id !== undefined){
            throw new BadRequestException('Cannot change role for the user during update')
        }
        return requestData;
    }
}