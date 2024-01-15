import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { NoticeboardService } from './noticeboard.service';
import { CreateNoticeDTO } from './dto/createNoticeDTO';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('noticeboard')
export class NoticeboardController {
  constructor(private readonly noticeboardService: NoticeboardService) {}

  @Post('createNotice')
  createNotice(@Body() createNoticeDTO : CreateNoticeDTO, @Req() req){
    const user = req.user;
    createNoticeDTO.SendFromUserId = user.id;
    return this.noticeboardService.createNotice(createNoticeDTO);
  }

  @Get('viewNotice/:id')
  viewNotice(@Param('id') id: number){
    return this.noticeboardService.viewNotice(id);
  }

  @Get('viewAllNotice')
  viewAllNotice(@Req() req){
    const user = req.user;
    return this.noticeboardService.viewAllNotice(user.id);
  }

  @Get('trackAllNotice')
  trackAllNotice(@Req() req){
    const user = req.user;
    return this.noticeboardService.trackAllNotice(user.id);
  }
}