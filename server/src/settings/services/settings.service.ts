import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FooterSettings,
  FooterSettingsDocument,
} from '../schemas/footer-settings.schema';
import {
  PrivacyPolicy,
  PrivacyPolicyDocument,
} from '../schemas/privacy-policy.schema';
import { AboutPage, AboutPageDocument } from '../schemas/about-page.schema';
import {
  TermsConditions,
  TermsConditionsDocument,
} from '../schemas/terms-conditions.schema';
import { UpdateFooterSettingsDto } from '../dtos/update-footer-settings.dto';
import { UpdatePrivacyPolicyDto } from '../dtos/update-privacy-policy.dto';
import { UpdateAboutPageDto } from '../dtos/update-about-page.dto';
import { UpdateTermsConditionsDto } from '../dtos/update-terms-conditions.dto';

const DEFAULT_ABOUT_SECTIONS = [
  {
    text: 'ჩვენი ტანსაცმელი გაფორმებულია საპიპინოებით, მაგრამ ეს მხოლოდ ვიზუალი არ არის - ისინი რეალურად აპიპინებენ! რადგან გვჯერა, რომ რაც აცვია ადამიანს, სწორედ ისაა მისი ხასიათის გაგრძელება.',
    textEn:
      "Our clothing is decorated with GalaKids, but it's not just visual — they actually cuddle! Because we believe that what you wear is an extension of your personality.",
    type: 'normal',
  },
  {
    text: 'ბრენდი GalaKids შეიქმნა ორი მეგობრის — მსახიობების რუსკა მაყაშვილისა და ლაშა ჯუხარაშვილის კოლაბორაციით. რომლებსაც ერთი მიზანი აერთიანებთ: შექმნან ტანსაცმელი და აქსესუარები, რომელიც არ აწესებს ჩარჩოებს და გაძლევთ საშუალებას იყო ისეთი, როგორიც ხარ — ხალისიანი, გულწრფელი, თავისუფალი და... პიპინაა',
    textEn:
      "The brand GalaKids was created through the collaboration of two friends — actors Ruska Makashvili and Lasha Jukharashvili. United by one goal: to create clothing and accessories that don't impose limits and let you be who you are — cheerful, sincere, free and... a GalaKids.",
    type: 'normal',
  },
  {
    text: 'ასე დაიბადა GalaKids იდეა — ტანსაცმლის, რომელიც არ იმალება, არ ჩუმდება და არ ცდილობს, იყოს სხვაზე უკეთესი',
    textEn:
      "This is how the idea of GalaKids was born — clothing that doesn't hide, doesn't stay quiet, and doesn't try to be better than anyone else.",
    type: 'highlight',
  },
  {
    text: 'ისეთი რაღაც უნდოდათ, რასაც ჩაიცვამ, სარკეში გაიღიმებ და იტყვი:',
    textEn:
      'They wanted something that when you put it on, you look in the mirror, smile and say:',
    type: 'normal',
  },
  {
    text: 'აუ, რა კარგ ხასიათზე ვარ!',
    textEn: "Wow, I'm in such a great mood!",
    type: 'quote',
  },
  {
    text: 'GalaKids არ არის მხოლოდ სტილი — ეს არის განწყობა, რომელიც მოგყვება ყოველდღიურად. იქნება ეს ქუჩაში, სახლში, კაფეში თუ სცენაზე, ჩვენი ლუქები გეხმარება, თავი იგრძნო კომფორტულად, გამორჩეულად და თავდაჯერებულად.',
    textEn:
      "GalaKids is not just style — it's a mood that follows you every day. Whether on the street, at home, in a café or on stage, our looks help you feel comfortable, unique and confident.",
    type: 'normal',
  },
  {
    text: 'თუ გიყვარს კომფორტი, სიმსუბუქე, ცოტაოდენი სიგიჟე და ბევრი სიყვარული ეს ყველაფერი ჩვენ ბრენდშია.',
    textEn:
      "If you love comfort, lightness, a bit of craziness and lots of love — it's all in our brand.",
    type: 'final',
  },
];

const DEFAULT_PRIVACY_SECTIONS = [
  {
    title: 'ინფორმაციის შეგროვება',
    titleEn: 'Information Collection',
    content:
      'თქვენგან ვაგროვებთ იმ ინფორმაციას, რომელსაც პირდაპირ გვაწვდით — მაგალითად, როცა ქმნით ანგარიშს, ასრულებთ შეძენას ან გვიკავშირდებით. ეს შეიძლება მოიცავდეს თქვენს სახელს, ელფოსტის მისამართს, ტელეფონის ნომერს, მიწოდების მისამართს და გადახდის ინფორმაციას.',
    contentEn:
      'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, shipping address, and payment information.',
    type: 'paragraph',
  },
  {
    title: 'როგორ ვიყენებთ თქვენს ინფორმაციას',
    titleEn: 'How We Use Your Information',
    content:
      'თქვენი შეკვეთების დამუშავება და შესრულება\nშეკვეთის დადასტურების და მიწოდების განახლებების გაგზავნა\nმომხმარებლის მხარდაჭერის უზრუნველყოფა\nჩვენი ვებსაიტის და სერვისების გაუმჯობესება\nსარეკლამო ელფოსტების გაგზავნა (თქვენი თანხმობით)',
    contentEn:
      'Process and fulfill your orders\nSend you order confirmations and shipping updates\nProvide customer support\nImprove our website and services\nSend promotional emails (with your consent)',
    type: 'list',
  },
  {
    title: 'ინფორმაციის გაზიარება',
    titleEn: 'Information Sharing',
    content:
      'ჩვენ არ ვყიდით, არ ვცვლით და არ ვაქირავებთ თქვენს პირად ინფორმაციას მესამე მხარეებისთვის. შეიძლება გავაზიაროთ თქვენი ინფორმაცია სანდო სერვის პროვაიდერებთან, რომლებიც გვეხმარებიან ჩვენი ბიზნესის მართვაში, როგორიცაა გადახდის დამუშავებისა და მიწოდების კომპანიები, მაგრამ მხოლოდ იმ ფარგლებში, რომელიც საჭიროა ჩვენი სერვისების უზრუნველსაყოფად.',
    contentEn:
      'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who help us operate our business, such as payment processors and shipping companies, but only to the extent necessary to provide our services.',
    type: 'paragraph',
  },
  {
    title: 'მონაცემთა უსაფრთხოება',
    titleEn: 'Data Security',
    content:
      'ჩვენ ვახორციელებთ შესაბამის უსაფრთხოების ზომებს თქვენი პირადი ინფორმაციის დასაცავად უნებართვო წვდომისგან, შეცვლისგან, გამჟღავნებისგან ან განადგურებისგან. თუმცა, ინტერნეტით გადაცემის არცერთი მეთოდი არ არის 100% უსაფრთხო.',
    contentEn:
      'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
    type: 'paragraph',
  },
  {
    title: 'ქუქიები',
    titleEn: 'Cookies',
    content:
      'ჩვენი ვებსაიტი იყენებს ქუქიებს თქვენი დათვალიერების გამოცდილების გასაუმჯობესებლად, თქვენი პრეფერენსების დასამახსოვრებლად და ვებსაიტის ტრაფიკის გასაანალიზებლად. შეგიძლიათ გამორთოთ ქუქიები თქვენი ბრაუზერის პარამეტრებში, მაგრამ ეს შეიძლება იმოქმედოს ჩვენი ვებსაიტის ფუნქციონალზე.',
    contentEn:
      'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can disable cookies in your browser settings, but this may affect the functionality of our website.',
    type: 'paragraph',
  },
  {
    title: 'თქვენი უფლებები',
    titleEn: 'Your Rights',
    content:
      'გაქვთ უფლება, იხილოთ, განაახლოთ ან წაშალოთ თქვენი პირადი ინფორმაცია. ასევე შეგიძლიათ ნებისმიერ დროს გააუქმოთ სარეკლამო ელფოსტების მიღება. აღნიშნული უფლებების გამოსაყენებლად, გთხოვთ დაგვიკავშირდეთ ქვემოთ მოცემული საკონტაქტო ინფორმაციის გამოყენებით.',
    contentEn:
      'You have the right to access, update, or delete your personal information. You can also unsubscribe from promotional emails at any time. To exercise these rights, please contact us using the information provided below.',
    type: 'paragraph',
  },
  {
    title: 'საკონტაქტო ინფორმაცია',
    titleEn: 'Contact Information',
    content:
      'თუ გაქვთ რაიმე კითხვა ამ კონფიდენციალურობის პოლიტიკასთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ:\nEmail: info@galakids.ge\nტელეფონი: +995 555 123 456\nმისამართი: თბილისი, საქართველო',
    contentEn:
      'If you have any questions about this Privacy Policy, please contact us at:\nEmail: info@galakids.ge\nPhone: +995 555 123 456\nAddress: Tbilisi, Georgia',
    type: 'paragraph',
  },
  {
    title: 'ცვლილებები ამ პოლიტიკაში',
    titleEn: 'Changes to This Policy',
    content:
      'ჩვენ შეიძლება პერიოდულად განვაახლოთ კონფიდენციალურობის პოლიტიკა. ჩვენ შეგატყობინებთ ნებისმიერი ცვლილების შესახებ ამ გვერდზე ახალი კონფიდენციალურობის პოლიტიკის განთავსებით და ამოქმედების თარიღის განახლებით.',
    contentEn:
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.',
    type: 'paragraph',
  },
];

const DEFAULT_TERMS_SECTIONS = [
  {
    title: 'ზოგადი პირობები',
    titleEn: 'General Terms',
    content:
      'ვებგვერდით სარგებლობით თქვენ ეთანხმებით ამ წესებსა და პირობებს. გთხოვთ, ყურადღებით წაიკითხოთ მათ გამოყენებამდე. თუ არ ეთანხმებით ამ პირობებს, გთხოვთ, არ გამოიყენოთ ჩვენი ვებგვერდი.',
    contentEn:
      'By using this website, you agree to these Terms and Conditions. Please read them carefully before use. If you do not agree to these terms, please do not use our website.',
    type: 'paragraph',
  },
  {
    title: 'შეკვეთა და გადახდა',
    titleEn: 'Orders and Payment',
    content:
      'შეკვეთის გაფორმებისას თქვენ ადასტურებთ, რომ მოწოდებული ინფორმაცია სწორია.\nგადახდა ხორციელდება ონლაინ საბანკო ბარათით.\nშეკვეთა დადასტურებულად ითვლება გადახდის წარმატებით შესრულების შემდეგ.\nჩვენ ვიტოვებთ უფლებას უარი ვთქვათ ნებისმიერ შეკვეთაზე.',
    contentEn:
      'By placing an order, you confirm that the information provided is correct.\nPayment is made online via bank card.\nAn order is considered confirmed after successful payment.\nWe reserve the right to refuse any order.',
    type: 'list',
  },
  {
    title: 'მიწოდება',
    titleEn: 'Delivery',
    content:
      'მიწოდება ხორციელდება საქართველოს მასშტაბით. მიწოდების ვადა დამოკიდებულია თქვენს მდებარეობაზე და შეიძლება იყოს 1-5 სამუშაო დღე. მიწოდების საფასური გამოითვლება შეკვეთის გაფორმებისას.',
    contentEn:
      'Delivery is available throughout Georgia. Delivery time depends on your location and may take 1-5 business days. Shipping costs are calculated at checkout.',
    type: 'paragraph',
  },
  {
    title: 'დაბრუნება და გაცვლა',
    titleEn: 'Returns and Exchanges',
    content:
      'პროდუქტის დაბრუნება ან გაცვლა შესაძლებელია მიღებიდან 14 დღის განმავლობაში.\nპროდუქტი უნდა იყოს ორიგინალ შეფუთვაში, გამოუყენებელი და დაუზიანებელი.\nდაბრუნებისთვის გთხოვთ დაგვიკავშირდეთ ელ-ფოსტაზე ან ტელეფონით.\nფასდაკლებით შეძენილი პროდუქტები არ ექვემდებარება დაბრუნებას.',
    contentEn:
      'Products can be returned or exchanged within 14 days of receipt.\nThe product must be in its original packaging, unused, and undamaged.\nFor returns, please contact us via email or phone.\nDiscounted products are not eligible for returns.',
    type: 'list',
  },
  {
    title: 'ინტელექტუალური საკუთრება',
    titleEn: 'Intellectual Property',
    content:
      'ვებგვერდზე განთავსებული ყველა შინაარსი, მათ შორის ტექსტები, სურათები, ლოგოები, დიზაინი და პროგრამული უზრუნველყოფა, წარმოადგენს ჩვენს ინტელექტუალურ საკუთრებას და დაცულია საავტორო უფლებების კანონმდებლობით.',
    contentEn:
      'All content on this website, including text, images, logos, designs, and software, is our intellectual property and is protected by copyright law.',
    type: 'paragraph',
  },
  {
    title: 'პასუხისმგებლობის შეზღუდვა',
    titleEn: 'Limitation of Liability',
    content:
      'ჩვენ არ ვიღებთ პასუხისმგებლობას ნებისმიერ ზიანზე, რომელიც შეიძლება წარმოიშვას ვებგვერდის გამოყენების შედეგად. ვებგვერდი მოწოდებულია "როგორც არის" პრინციპით.',
    contentEn:
      'We are not liable for any damages that may arise from the use of this website. The website is provided on an "as is" basis.',
    type: 'paragraph',
  },
  {
    title: 'ცვლილებები პირობებში',
    titleEn: 'Changes to Terms',
    content:
      'ჩვენ ვიტოვებთ უფლებას ნებისმიერ დროს შევცვალოთ ეს წესები და პირობები. ცვლილებები ძალაში შედის ვებგვერდზე გამოქვეყნებისთანავე. გირჩევთ, პერიოდულად გადახედოთ ამ გვერდს.',
    contentEn:
      'We reserve the right to modify these Terms and Conditions at any time. Changes take effect immediately upon publication on the website. We recommend reviewing this page periodically.',
    type: 'paragraph',
  },
  {
    title: 'საკონტაქტო ინფორმაცია',
    titleEn: 'Contact Information',
    content:
      'თუ გაქვთ კითხვები ამ წესებთან და პირობებთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ:\nEmail: info@galakids.ge\nტელეფონი: +995 555 123 456\nმისამართი: თბილისი, საქართველო',
    contentEn:
      'If you have any questions about these Terms and Conditions, please contact us:\nEmail: info@galakids.ge\nPhone: +995 555 123 456\nAddress: Tbilisi, Georgia',
    type: 'paragraph',
  },
];

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(FooterSettings.name)
    private footerSettingsModel: Model<FooterSettingsDocument>,
    @InjectModel(PrivacyPolicy.name)
    private privacyPolicyModel: Model<PrivacyPolicyDocument>,
    @InjectModel(AboutPage.name)
    private aboutPageModel: Model<AboutPageDocument>,
    @InjectModel(TermsConditions.name)
    private termsConditionsModel: Model<TermsConditionsDocument>,
  ) {}

  async getFooterSettings(): Promise<FooterSettingsDocument> {
    let settings = await this.footerSettingsModel.findOne();
    if (!settings) {
      settings = await this.footerSettingsModel.create({});
    }
    return settings;
  }

  async updateFooterSettings(
    dto: UpdateFooterSettingsDto,
  ): Promise<FooterSettingsDocument> {
    let settings = await this.footerSettingsModel.findOne();
    if (!settings) {
      settings = await this.footerSettingsModel.create(dto);
    } else {
      Object.assign(settings, dto);
      await settings.save();
    }
    return settings;
  }

  async getPrivacyPolicy(): Promise<PrivacyPolicyDocument> {
    let policy = await this.privacyPolicyModel.findOne();
    if (!policy) {
      policy = await this.privacyPolicyModel.create({
        sections: DEFAULT_PRIVACY_SECTIONS,
      });
    }
    return policy;
  }

  async updatePrivacyPolicy(
    dto: UpdatePrivacyPolicyDto,
  ): Promise<PrivacyPolicyDocument> {
    let policy = await this.privacyPolicyModel.findOne();
    if (!policy) {
      policy = await this.privacyPolicyModel.create(dto);
    } else {
      Object.assign(policy, dto);
      await policy.save();
    }
    return policy;
  }

  async getAboutPage(): Promise<AboutPageDocument> {
    let about = await this.aboutPageModel.findOne();
    if (!about) {
      about = await this.aboutPageModel.create({
        sections: DEFAULT_ABOUT_SECTIONS,
      });
    }
    return about;
  }

  async updateAboutPage(dto: UpdateAboutPageDto): Promise<AboutPageDocument> {
    let about = await this.aboutPageModel.findOne();
    if (!about) {
      about = await this.aboutPageModel.create(dto);
    } else {
      Object.assign(about, dto);
      await about.save();
    }
    return about;
  }

  async getTermsConditions(): Promise<TermsConditionsDocument> {
    let terms = await this.termsConditionsModel.findOne();
    if (!terms) {
      terms = await this.termsConditionsModel.create({
        sections: DEFAULT_TERMS_SECTIONS,
      });
    }
    return terms;
  }

  async updateTermsConditions(
    dto: UpdateTermsConditionsDto,
  ): Promise<TermsConditionsDocument> {
    let terms = await this.termsConditionsModel.findOne();
    if (!terms) {
      terms = await this.termsConditionsModel.create(dto);
    } else {
      Object.assign(terms, dto);
      await terms.save();
    }
    return terms;
  }
}
