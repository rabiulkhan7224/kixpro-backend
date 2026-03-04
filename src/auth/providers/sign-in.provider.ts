import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
    constructor(
// Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

         /**
     * Inject the hashingProvider
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,

    ){}


}
