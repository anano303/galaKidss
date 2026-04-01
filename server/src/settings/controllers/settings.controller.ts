import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SettingsService } from '../services/settings.service';
import { UpdateFooterSettingsDto } from '../dtos/update-footer-settings.dto';
import { UpdatePrivacyPolicyDto } from '../dtos/update-privacy-policy.dto';
import { UpdateAboutPageDto } from '../dtos/update-about-page.dto';
import { UpdateTermsConditionsDto } from '../dtos/update-terms-conditions.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { Role } from '@/types/role.enum';
import { CloudinaryService } from '@/cloudinary/services/cloudinary.service';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('footer')
  async getFooterSettings() {
    return this.settingsService.getFooterSettings();
  }

  @Put('footer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateFooterSettings(@Body() dto: UpdateFooterSettingsDto) {
    return this.settingsService.updateFooterSettings(dto);
  }

  @Get('privacy-policy')
  async getPrivacyPolicy() {
    return this.settingsService.getPrivacyPolicy();
  }

  @Put('privacy-policy')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updatePrivacyPolicy(@Body() dto: UpdatePrivacyPolicyDto) {
    return this.settingsService.updatePrivacyPolicy(dto);
  }

  @Get('about')
  async getAboutPage() {
    return this.settingsService.getAboutPage();
  }

  @Put('about')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateAboutPage(@Body() dto: UpdateAboutPageDto) {
    return this.settingsService.updateAboutPage(dto);
  }

  @Get('terms-conditions')
  async getTermsConditions() {
    return this.settingsService.getTermsConditions();
  }

  @Put('terms-conditions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateTermsConditions(@Body() dto: UpdateTermsConditionsDto) {
    return this.settingsService.updateTermsConditions(dto);
  }

  @Post('about/upload-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAboutImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const result = await this.cloudinaryService.uploadImage(file);
    const optimizedUrl = result.secure_url.replace(
      '/upload/',
      '/upload/q_auto,f_auto,w_800/',
    );
    return { url: optimizedUrl };
  }
}
