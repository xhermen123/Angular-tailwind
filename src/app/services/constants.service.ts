import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

export interface FilterType {
  language: string,
  accountType: string,
  searchText: string
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
    public languageCodes = [
        {
          id: 'ab',
          label: 'Abkhaz'
        },
        {
          id: 'aa',
          label: 'Afar'
        },
        {
          id: 'af',
          label: 'Afrikaans'
        },
        {
          id: 'ak',
          label: 'Akan'
        },
        {
          id: 'sq',
          label: 'Albanian'
        },
        {
          id: 'am',
          label: 'Amharic'
        },
        {
          id: 'ar',
          label: 'Arabic'
        },
        {
          id: 'an',
          label: 'Aragonese'
        },
        {
          id: 'hy',
          label: 'Armenian'
        },
        {
          id: 'as',
          label: 'Assamese'
        },
        {
          id: 'av',
          label: 'Avaric'
        },
        {
          id: 'ae',
          label: 'Avestan'
        },
        {
          id: 'ay',
          label: 'Aymara'
        },
        {
          id: 'az',
          label: 'Azerbaijani'
        },
        {
          id: 'bm',
          label: 'Bambara'
        },
        {
          id: 'ba',
          label: 'Bashkir'
        },
        {
          id: 'eu',
          label: 'Basque'
        },
        {
          id: 'be',
          label: 'Belarusian'
        },
        {
          id: 'bn',
          label: 'Bengali; Bangla'
        },
        {
          id: 'bh',
          label: 'Bihari'
        },
        {
          id: 'bi',
          label: 'Bislama'
        },
        {
          id: 'bs',
          label: 'Bosnian'
        },
        {
          id: 'br',
          label: 'Breton'
        },
        {
          id: 'bg',
          label: 'Bulgarian'
        },
        {
          id: 'my',
          label: 'Burmese'
        },
        {
          id: 'ca',
          label: 'Catalan; Valencian'
        },
        {
          id: 'ch',
          label: 'Chamorro'
        },
        {
          id: 'ce',
          label: 'Chechen'
        },
        {
          id: 'ny',
          label: 'Chichewa; Chewa; Nyanja'
        },
        {
          id: 'zh',
          label: 'Chinese'
        },
        {
          id: 'cv',
          label: 'Chuvash'
        },
        {
          id: 'kw',
          label: 'Cornish'
        },
        {
          id: 'co',
          label: 'Corsican'
        },
        {
          id: 'cr',
          label: 'Cree'
        },
        {
          id: 'hr',
          label: 'Croatian'
        },
        {
          id: 'cs',
          label: 'Czech'
        },
        {
          id: 'da',
          label: 'Danish'
        },
        {
          id: 'dv',
          label: 'Divehi; Dhivehi; Maldivian;'
        },
        {
          id: 'nl',
          label: 'Dutch'
        },
        {
          id: 'dz',
          label: 'Dzongkha'
        },
        {
          id: 'en',
          label: 'English'
        },
        {
          id: 'eo',
          label: 'Esperanto'
        },
        {
          id: 'et',
          label: 'Estonian'
        },
        {
          id: 'ee',
          label: 'Ewe'
        },
        {
          id: 'fo',
          label: 'Faroese'
        },
        {
          id: 'fj',
          label: 'Fijian'
        },
        {
          id: 'fi',
          label: 'Finnish'
        },
        {
          id: 'fr',
          label: 'French'
        },
        {
          id: 'ff',
          label: 'Fula; Fulah; Pulaar; Pular'
        },
        {
          id: 'gl',
          label: 'Galician'
        },
        {
          id: 'ka',
          label: 'Georgian'
        },
        {
          id: 'de',
          label: 'German'
        },
        {
          id: 'el',
          label: 'Greek, Modern'
        },
        {
          id: 'gn',
          label: 'GuaranÃ­'
        },
        {
          id: 'gu',
          label: 'Gujarati'
        },
        {
          id: 'ht',
          label: 'Haitian; Haitian Creole'
        },
        {
          id: 'ha',
          label: 'Hausa'
        },
        {
          id: 'he',
          label: 'Hebrew (modern)'
        },
        {
          id: 'hz',
          label: 'Herero'
        },
        {
          id: 'hi',
          label: 'Hindi'
        },
        {
          id: 'ho',
          label: 'Hiri Motu'
        },
        {
          id: 'hu',
          label: 'Hungarian'
        },
        {
          id: 'ia',
          label: 'Interlingua'
        },
        {
          id: 'id',
          label: 'Indonesian'
        },
        {
          id: 'ie',
          label: 'Interlingue'
        },
        {
          id: 'ga',
          label: 'Irish'
        },
        {
          id: 'ig',
          label: 'Igbo'
        },
        {
          id: 'ik',
          label: 'Inupiaq'
        },
        {
          id: 'io',
          label: 'Ido'
        },
        {
          id: 'is',
          label: 'Icelandic'
        },
        {
          id: 'it',
          label: 'Italian'
        },
        {
          id: 'iu',
          label: 'Inuktitut'
        },
        {
          id: 'ja',
          label: 'Japanese'
        },
        {
          id: 'jv',
          label: 'Javanese'
        },
        {
          id: 'kl',
          label: 'Kalaallisut, Greenlandic'
        },
        {
          id: 'kn',
          label: 'Kannada'
        },
        {
          id: 'kr',
          label: 'Kanuri'
        },
        {
          id: 'ks',
          label: 'Kashmiri'
        },
        {
          id: 'kk',
          label: 'Kazakh'
        },
        {
          id: 'km',
          label: 'Khmer'
        },
        {
          id: 'ki',
          label: 'Kikuyu, Gikuyu'
        },
        {
          id: 'rw',
          label: 'Kinyarwanda'
        },
        {
          id: 'ky',
          label: 'Kyrgyz'
        },
        {
          id: 'kv',
          label: 'Komi'
        },
        {
          id: 'kg',
          label: 'Kongo'
        },
        {
          id: 'ko',
          label: 'Korean'
        },
        {
          id: 'ku',
          label: 'Kurdish'
        },
        {
          id: 'kj',
          label: 'Kwanyama, Kuanyama'
        },
        {
          id: 'la',
          label: 'Latin'
        },
        {
          id: 'lb',
          label: 'Luxembourgish, Letzeburgesch'
        },
        {
          id: 'lg',
          label: 'Ganda'
        },
        {
          id: 'li',
          label: 'Limburgish, Limburgan, Limburger'
        },
        {
          id: 'ln',
          label: 'Lingala'
        },
        {
          id: 'lo',
          label: 'Lao'
        },
        {
          id: 'lt',
          label: 'Lithuanian'
        },
        {
          id: 'lu',
          label: 'Luba-Katanga'
        },
        {
          id: 'lv',
          label: 'Latvian'
        },
        {
          id: 'gv',
          label: 'Manx'
        },
        {
          id: 'mk',
          label: 'Macedonian'
        },
        {
          id: 'mg',
          label: 'Malagasy'
        },
        {
          id: 'ms',
          label: 'Malay'
        },
        {
          id: 'ml',
          label: 'Malayalam'
        },
        {
          id: 'mt',
          label: 'Maltese'
        },
        {
          id: 'mi',
          label: 'MÄori'
        },
        {
          id: 'mr',
          label: 'Marathi (MarÄá¹­hÄ«)'
        },
        {
          id: 'mh',
          label: 'Marshallese'
        },
        {
          id: 'mn',
          label: 'Mongolian'
        },
        {
          id: 'na',
          label: 'Nauru'
        },
        {
          id: 'nv',
          label: 'Navajo, Navaho'
        },
        {
          id: 'nb',
          label: 'Norwegian BokmÃ¥l'
        },
        {
          id: 'nd',
          label: 'North Ndebele'
        },
        {
          id: 'ne',
          label: 'Nepali'
        },
        {
          id: 'ng',
          label: 'Ndonga'
        },
        {
          id: 'nn',
          label: 'Norwegian Nynorsk'
        },
        {
          id: 'no',
          label: 'Norwegian'
        },
        {
          id: 'ii',
          label: 'Nuosu'
        },
        {
          id: 'nr',
          label: 'South Ndebele'
        },
        {
          id: 'oc',
          label: 'Occitan'
        },
        {
          id: 'oj',
          label: 'Ojibwe, Ojibwa'
        },
        {
          id: 'cu',
          label: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic'
        },
        {
          id: 'om',
          label: 'Oromo'
        },
        {
          id: 'or',
          label: 'Oriya'
        },
        {
          id: 'os',
          label: 'Ossetian, Ossetic'
        },
        {
          id: 'pa',
          label: 'Panjabi, Punjabi'
        },
        {
          id: 'pi',
          label: 'PÄli'
        },
        {
          id: 'fa',
          label: 'Persian (Farsi)'
        },
        {
          id: 'pl',
          label: 'Polish'
        },
        {
          id: 'ps',
          label: 'Pashto, Pushto'
        },
        {
          id: 'pt',
          label: 'Portuguese'
        },
        {
          id: 'qu',
          label: 'Quechua'
        },
        {
          id: 'rm',
          label: 'Romansh'
        },
        {
          id: 'rn',
          label: 'Kirundi'
        },
        {
          id: 'ro',
          label: 'Romanian, [])'
        },
        {
          id: 'ru',
          label: 'Russian'
        },
        {
          id: 'sa',
          label: 'Sanskrit (Saá¹ská¹›ta)'
        },
        {
          id: 'sc',
          label: 'Sardinian'
        },
        {
          id: 'sd',
          label: 'Sindhi'
        },
        {
          id: 'se',
          label: 'Northern Sami'
        },
        {
          id: 'sm',
          label: 'Samoan'
        },
        {
          id: 'sg',
          label: 'Sango'
        },
        {
          id: 'sr',
          label: 'Serbian'
        },
        {
          id: 'gd',
          label: 'Scottish Gaelic; Gaelic'
        },
        {
          id: 'sn',
          label: 'Shona'
        },
        {
          id: 'si',
          label: 'Sinhala, Sinhalese'
        },
        {
          id: 'sk',
          label: 'Slovak'
        },
        {
          id: 'sl',
          label: 'Slovene'
        },
        {
          id: 'so',
          label: 'Somali'
        },
        {
          id: 'st',
          label: 'Southern Sotho'
        },
        {
          id: 'az',
          label: 'South Azerbaijani'
        },
        {
          id: 'es',
          label: 'Spanish; Castilian'
        },
        {
          id: 'su',
          label: 'Sundanese'
        },
        {
          id: 'sw',
          label: 'Swahili'
        },
        {
          id: 'ss',
          label: 'Swati'
        },
        {
          id: 'sv',
          label: 'Swedish'
        },
        {
          id: 'ta',
          label: 'Tamil'
        },
        {
          id: 'te',
          label: 'Telugu'
        },
        {
          id: 'tg',
          label: 'Tajik'
        },
        {
          id: 'th',
          label: 'Thai'
        },
        {
          id: 'ti',
          label: 'Tigrinya'
        },
        {
          id: 'bo',
          label: 'Tibetan Standard, Tibetan, Central'
        },
        {
          id: 'tk',
          label: 'Turkmen'
        },
        {
          id: 'tl',
          label: 'Tagalog'
        },
        {
          id: 'tn',
          label: 'Tswana'
        },
        {
          id: 'to',
          label: 'Tonga (Tonga Islands)'
        },
        {
          id: 'tr',
          label: 'Turkish'
        },
        {
          id: 'ts',
          label: 'Tsonga'
        },
        {
          id: 'tt',
          label: 'Tatar'
        },
        {
          id: 'tw',
          label: 'Twi'
        },
        {
          id: 'ty',
          label: 'Tahitian'
        },
        {
          id: 'ug',
          label: 'Uyghur, Uighur'
        },
        {
          id: 'uk',
          label: 'Ukrainian'
        },
        {
          id: 'ur',
          label: 'Urdu'
        },
        {
          id: 'uz',
          label: 'Uzbek'
        },
        {
          id: 've',
          label: 'Venda'
        },
        {
          id: 'vi',
          label: 'Vietnamese'
        },
        {
          id: 'vo',
          label: 'VolapÃ¼k'
        },
        {
          id: 'wa',
          label: 'Walloon'
        },
        {
          id: 'cy',
          label: 'Welsh'
        },
        {
          id: 'wo',
          label: 'Wolof'
        },
        {
          id: 'fy',
          label: 'Western Frisian'
        },
        {
          id: 'xh',
          label: 'Xhosa'
        },
        {
          id: 'yi',
          label: 'Yiddish'
        },
        {
          id: 'yo',
          label: 'Yoruba'
        },
        {
          id: 'za',
          label: 'Zhuang, Chuang'
        },
        {
          id: 'zu',
          label: 'Zulu'
        }
    ];

    public accountTypeList = [{
        id: 'live',
        label: 'Live'
    }, {
        id: 'sandbox',
        label: 'Sandbox'
    }, {
        id: 'community_sift',
        label: 'CommunitySift'
    }];

    public chatTypeList = [{
        id: 'chat',
        label: 'Chat'
    }];

    public topicTypes = {
        0: {
            name: 'General Risk',
            color: 'yellow',
            icon: 'comments'
        },
        1: {
            name: 'Bullying',
            color: 'yellow',
            icon: 'comments'
        },
        2: {
            name: 'Fighting',
            color: 'yellow',
            icon: 'comments'
        },
        3: {
            name: 'Pii',
            color: 'yellow',
            icon: 'comments'
        },
        4: {
            name: 'Dating And Sexing',
            color: 'yellow',
            icon: 'comments'
        },
        5: {
            name: 'Vulgar',
            color: 'orange',
            icon: 'angry'
        },
        6: {
            name: 'Drugs And Alcohol',
            color: 'orange',
            icon: 'angry'
        }
    };

    public riskGrades = [
        {
            id: 'always_safe',
            value: 0,
            label: 'Not',
            color: 'var(--risk-0)',
            tooltip: 'Always Safe'
        },
        {
            id: 'very_safe',
            value: 1,
            label: 1,
            color: 'var(--risk-1)',
            tooltip: 'Very Safe'
        },
        {
            id: 'grey',
            value: 2,
            label: 2,
            color: 'var(--risk-2)',
            tooltip: 'Grey'
        },
        {
            id: 'questionable',
            value: 3,
            label: 3,
            color: 'var(--risk-3)',
            tooltip: 'Questionable'
        },
        {
            id: 'unknown',
            value: 4,
            label: 4,
            color: 'var(--risk-4)',
            tooltip: 'Unknown'
        },
        {
            id: 'mild',
            value: 5,
            label: 5,
            color: 'var(--risk-5)',
            tooltip: 'Mild'
        },
        {
            id: 'offensive',
            value: 6,
            label: 6,
            color: 'var(--risk-6)',
            tooltip: 'Offensive'
        },
        {
            id: 'obscene',
            value: 7,
            label: 7,
            color: 'var(--risk-7)',
            tooltip: 'Obscene'
        }
    ]

    public topicList = [
        {
            id: 0,
            label: 'GENERAL RISK'
        },
        {
            id: 1,
            label: 'BULLYING'
        },
        {
            id: 2,
            label: 'FIGHTING'
        },
        {
            id: 3,
            label: 'PII'
        },
        {
            id: 4,
            label: 'DATING AND SEXTING'
        },
        {
            id: 5,
            label: 'VULGAR'
        },
        {
            id: 6,
            label: 'DRUGS AND ALCOHOL'
        },
        {
            id: 7,
            label: 'IN GAME'
        },
        {
            id: 8,
            label: 'ALARM'
        },
        {
            id: 9,
            label: 'FRAUD'
        },
        {
            id: 10,
            label: 'RACIST'
        },
        {
            id: 11,
            label: 'RELIGION'
        },
        {
            id: 12,
            label: 'JUNK (not being used)'
        },
        {
            id: 13,
            label: 'WEBSITE'
        },
        {
            id: 14,
            label: 'GROOMING'
        },
        {
            id: 15,
            label: 'PUBLIC THREATS'
        },
        {
            id: 16,
            label: 'REAL NAME'
        },
        {
            id: 17,
            label: 'RADICALIZATION'
        },
        {
            id: 18,
            label: 'SUBVERSIVE'
        },
        {
            id: 19,
            label: 'SENTIMENT'
        },
        {
            id: 20,
            label: 'GENERAL RISK'
        },
        {
            id: 21,
            label: 'GENERAL RISK'
        },
        {
            id: 22,
            label: 'GENERAL RISK'
        },
    ];


}
