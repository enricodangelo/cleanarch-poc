import { Controller, Post } from '@nestjs/common';
import { TestUsecase } from '../../../application/usecase/test.usecase';

@Controller('test')
export class TestController {
    constructor(private readonly testUsecase: TestUsecase) {}

    @Post()
    async post(): Promise<void> {
        await this.testUsecase.execute();
    }
}
