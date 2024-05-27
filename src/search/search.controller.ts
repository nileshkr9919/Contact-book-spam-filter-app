import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {SearchService} from './search.service';
import {ApiBearerAuth, ApiTags, ApiResponse, ApiQuery} from '@nestjs/swagger';

@ApiTags('SearchController')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get('name')
  @ApiQuery({name: 'name', type: String, description: 'Name to search for'})
  @ApiResponse({status: 200, description: 'Search results by name'})
  async searchByName(@Query('name') name: string) {
    return this.searchService.searchByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('number')
  @ApiQuery({name: 'number', type: String, description: 'Number to search for'})
  @ApiResponse({status: 200, description: 'Search results by number'})
  async searchByNumber(@Req() req, @Query('number') number: string) {
    return this.searchService.searchByNumber(number, req.user.userId);
  }
}
