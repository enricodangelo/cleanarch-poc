import { Controller, Post } from '@nestjs/common';
import { Test01Usecase } from '../../../application/usecase/test01.usecase';

@Controller('test01')
export class Test01Controller {
    constructor(private readonly test01Usecase: Test01Usecase) {}

    @Post()
    async post(): Promise<void> {
        await this.test01Usecase.execute();
    }
}
