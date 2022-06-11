import { Controller, Post } from '@nestjs/common';
import { Test02Usecase } from '../../../application/usecase/test02.usecase';

@Controller('test02')
export class Test02Controller {
    constructor(private readonly test02Usecase: Test02Usecase) {}

    @Post()
    async post(): Promise<void> {
        await this.test02Usecase.execute();
    }
}
