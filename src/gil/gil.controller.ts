import { Controller, Get } from '@nestjs/common';

@Controller('gil')
export class GilController {
    @Get()
    test() {
        return 'test gil2';
    }

    @Get('foo')
    foo() {
        return 'test   1111';
    }
}
