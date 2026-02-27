import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {

  public async hashPassword(password: string | Buffer): Promise<string> {
        // generate salt
       const salt = await bcrypt.genSalt()
         // hash password
         return bcrypt.hash(password, salt)

    }
    comparePassword(password: string | Buffer, encrypted: string): Promise<boolean> {
        return bcrypt.compare(password, encrypted)
    }
}
