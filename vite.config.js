import { defineConfig } from 'vite';
import path from 'path';
import nunjucks from 'vite-plugin-nunjucks';
import { createHtmlPlugin } from 'vite-plugin-html';
import data from './src/assets/json/data.json';

// other config settings: https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hmr: true,
  },
  build: {
    outDir: '../build',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/app.min.js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: assetInfo => {
          const fileName = assetInfo.name;
          const extName = path.extname(fileName);

          switch (true) {
            case fileName === 'style.css':
              return 'assets/css/style.css';

            case extName === '.jpg' ||
              extName === '.jpeg' ||
              extName === '.png' ||
              extName === '.webp' ||
              extName === '.svg' ||
              extName === '.gif':
              return `assets/images/[name][extname]`;

            default:
              return 'assets/[name][extname]';
          }
        },
      },
    },
  },
  plugins: [
    nunjucks({
      variables: { 'index.html': data },
      nunjucksConfigure: { autoescape: false },
    }),
    createHtmlPlugin({
      // https://github.com/vbenjs/vite-plugin-html/tree/main?tab=readme-ov-file#minifyoptions
      minify: {
        // collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
      },
      inject: {
        data: {
          foreach: {
            start: '<?php foreach (',
            close: ' as $value): ?>',
            end: '<?php endforeach; ?>',
          },
          contacts: {
            tel: '<?= helpersPhone::convertMobile(htmlspecialchars($value)) ?>',
            content: '<?php echo htmlspecialchars($value); ?>',
          },
          socials: {
            url: "<?php echo htmlspecialchars($array['url']); ?>",
            title: "<?php echo htmlspecialchars($array['title']); ?>",
            svgStart: '<?php',
            svgEnd: '?>',
            svgId: "echo $array['id'];",
            facebookSvg:
              "echo htmlspecialchars(<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='40' height='40' rx='16' fill='#3D6DE6' /> <path d='M26 15.7713H21.5727V13.2804C21.5727 12.3449 22.2954 12.1268 22.8044 12.1268C23.3123 12.1268 25.9288 12.1268 25.9288 12.1268V8.01441L21.6259 8C16.8494 8 15.7624 11.0672 15.7624 13.03V15.7713H13V20.0089H15.7624C15.7624 25.4473 15.7624 32 15.7624 32H21.5727C21.5727 32 21.5727 25.3827 21.5727 20.0089H25.4933L26 15.7713Z' fill='white' /> </svg>);",
            instagramSvg:
              "echo htmlspecialchars(<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='40' height='40' rx='16' fill='#D53692' /> <path d='M16.6686 20C16.6686 18.1591 18.1601 16.6664 20.0004 16.6664C21.8408 16.6664 23.333 18.1591 23.333 20C23.333 21.8409 21.8408 23.3336 20.0004 23.3336C18.1601 23.3336 16.6686 21.8409 16.6686 20ZM14.867 20C14.867 22.836 17.1652 25.1349 20.0004 25.1349C22.8356 25.1349 25.1338 22.836 25.1338 20C25.1338 17.164 22.8356 14.8651 20.0004 14.8651C17.1652 14.8651 14.867 17.164 14.867 20ZM24.1374 14.6615C24.1373 14.8989 24.2075 15.1309 24.3393 15.3283C24.471 15.5257 24.6583 15.6796 24.8775 15.7705C25.0967 15.8614 25.3379 15.8852 25.5706 15.839C25.8033 15.7928 26.0171 15.6786 26.185 15.5109C26.3528 15.3431 26.4672 15.1293 26.5135 14.8966C26.5599 14.6638 26.5363 14.4225 26.4455 14.2032C26.3548 13.9839 26.2012 13.7964 26.0039 13.6645C25.8067 13.5326 25.5748 13.4621 25.3375 13.462H25.337C25.019 13.4621 24.714 13.5886 24.4891 13.8135C24.2641 14.0384 24.1377 14.3434 24.1374 14.6615ZM15.9616 28.1398C14.9869 28.0954 14.4571 27.933 14.1051 27.7958C13.6383 27.614 13.3053 27.3975 12.9552 27.0478C12.605 26.698 12.3883 26.3652 12.2074 25.8983C12.0701 25.5463 11.9078 25.0162 11.8635 24.0413C11.815 22.9872 11.8053 22.6706 11.8053 20.0001C11.8053 17.3296 11.8158 17.0138 11.8635 15.9589C11.9079 14.9839 12.0714 14.4549 12.2074 14.1018C12.3891 13.635 12.6055 13.3018 12.9552 12.9516C13.3048 12.6014 13.6375 12.3846 14.1051 12.2036C14.457 12.0663 14.9869 11.9039 15.9616 11.8596C17.0154 11.8111 17.3319 11.8014 20.0004 11.8014C22.6689 11.8014 22.9858 11.8119 24.0404 11.8596C25.0151 11.904 25.544 12.0676 25.8969 12.2036C26.3637 12.3846 26.6967 12.6018 27.0469 12.9516C27.397 13.3014 27.6129 13.635 27.7946 14.1018C27.9319 14.4538 28.0942 14.9839 28.1385 15.9589C28.187 17.0138 28.1967 17.3296 28.1967 20.0001C28.1967 22.6706 28.187 22.9863 28.1385 24.0413C28.0942 25.0162 27.931 25.5462 27.7946 25.8983C27.6129 26.3652 27.3965 26.6983 27.0469 27.0478C26.6972 27.3972 26.3637 27.614 25.8969 27.7958C25.5451 27.933 25.0151 28.0954 24.0404 28.1398C22.9867 28.1882 22.6701 28.1979 20.0004 28.1979C17.3307 28.1979 17.015 28.1882 15.9616 28.1398ZM15.8788 10.0606C14.8145 10.109 14.0873 10.2778 13.4522 10.525C12.7945 10.7803 12.2377 11.1228 11.6813 11.6785C11.1249 12.2342 10.7834 12.792 10.5282 13.4499C10.2811 14.0856 10.1123 14.8126 10.0638 15.8772C10.0146 16.9434 10.0033 17.2843 10.0033 20C10.0033 22.7157 10.0146 23.0566 10.0638 24.1228C10.1123 25.1874 10.2811 25.9144 10.5282 26.5501C10.7834 27.2076 11.125 27.7661 11.6813 28.3215C12.2376 28.877 12.7945 29.219 13.4522 29.475C14.0885 29.7222 14.8145 29.891 15.8788 29.9394C16.9453 29.9879 17.2855 30 20.0004 30C22.7153 30 23.0561 29.9887 24.122 29.9394C25.1864 29.891 25.9131 29.7222 26.5486 29.475C27.2059 29.219 27.7631 28.8772 28.3195 28.3215C28.8759 27.7658 29.2167 27.2076 29.4726 26.5501C29.7198 25.9144 29.8893 25.1874 29.937 24.1228C29.9854 23.0558 29.9967 22.7157 29.9967 20C29.9967 17.2843 29.9854 16.9434 29.937 15.8772C29.8885 14.8126 29.7198 14.0852 29.4726 13.4499C29.2167 12.7924 28.875 12.235 28.3195 11.6785C27.764 11.1219 27.2059 10.7803 26.5494 10.525C25.9131 10.2778 25.1863 10.1082 24.1228 10.0606C23.0569 10.0121 22.7161 10 20.0012 10C17.2863 10 16.9453 10.0113 15.8788 10.0606Z' fill='white' /> </svg>);",
            linkedinSvg:
              "echo htmlspecialchars(<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='40' height='40' rx='16' fill='#3F76B6' /> <path d='M13.21 32H8.08541V14.8571H13.21V32ZM32 32H26.8754V22.8423C26.8754 20.456 26.0282 19.268 24.349 19.268C23.0184 19.268 22.1745 19.9331 21.7509 21.2651C21.7509 23.4286 21.7509 32 21.7509 32H16.6263C16.6263 32 16.6947 16.5714 16.6263 14.8571H20.6713L20.9839 18.2857H21.0898C22.1404 16.5714 23.8195 15.4091 26.1221 15.4091C27.873 15.4091 29.2891 15.8977 30.3704 17.1251C31.4585 18.3543 32 20.0034 32 22.3194V32Z' fill='white' /> <path d='M10.6477 13.1429C12.11 13.1429 13.2954 11.9916 13.2954 10.5714C13.2954 9.15127 12.11 8 10.6477 8C9.18541 8 8 9.15127 8 10.5714C8 11.9916 9.18541 13.1429 10.6477 13.1429Z' fill='white' /> </svg>);",
            telegramSvg:
              "echo htmlspecialchars(<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='40' height='40' rx='16' fill='#5EB5F7' /> <path d='M31.9316 10.1848L28.3099 30.5513C28.0366 31.9887 27.324 32.3463 26.3114 31.6693L20.793 26.8204L18.1304 29.8741C17.8358 30.2255 17.5892 30.5194 17.0214 30.5194L17.4178 23.8178L27.6455 12.7977C28.0902 12.325 27.5491 12.063 26.9544 12.5358L14.3104 22.029L8.86705 19.9975C7.68301 19.5567 7.66162 18.5856 9.11347 17.9085L30.4047 8.1278C31.3904 7.68703 32.2531 8.38965 31.9316 10.1848Z' fill='white' /> </svg>);",
            tiktokSvg:
              "echo htmlspecialchars(<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='40' height='40' rx='16' fill='white' /> <g clip-path='url(#clip0_1_18)'> <path d='M16.5875 20.4453C14.6844 20.4453 13.1469 21.9828 13.175 23.8719C13.1938 25.0813 13.8594 26.1312 14.8391 26.7172C14.5063 26.2062 14.3094 25.6016 14.3 24.95C14.2719 23.0656 15.8094 21.5281 17.7125 21.5281C18.0875 21.5281 18.4484 21.5891 18.7859 21.6969V17.9234C18.4344 17.8719 18.0734 17.8438 17.7125 17.8438C17.6938 17.8438 17.6797 17.8438 17.6609 17.8438V20.6188C17.3234 20.5063 16.9625 20.4453 16.5875 20.4453Z' fill='#F00044' /> <path d='M24.8141 9.125H24.7859H23.8109C24.0922 10.5359 24.8844 11.7641 25.9906 12.5984C25.2641 11.6375 24.8234 10.4375 24.8141 9.125Z' fill='#F00044' /> <path d='M30.5516 18.5516V14.8719C30.1813 14.8719 29.825 14.8344 29.4734 14.7687V17.4688C28.1984 17.4688 26.9609 17.2203 25.7984 16.7234C25.0484 16.4047 24.35 15.9969 23.7078 15.5047L23.7266 23.8438C23.7172 25.7188 22.9766 27.4766 21.6359 28.8031C20.5438 29.8812 19.1609 30.5703 17.6609 30.7906C17.3094 30.8422 16.9484 30.8703 16.5875 30.8703C15.6922 30.8703 14.825 30.7062 14.0141 30.4016C14.3563 30.5984 14.7078 30.7813 15.0734 30.9453C15.9594 31.3438 16.9016 31.6391 17.8859 31.8125C18.0922 31.85 18.2984 31.8781 18.5094 31.9063C18.6031 31.8969 18.6922 31.8828 18.7859 31.8688C20.2859 31.6484 21.6688 30.9594 22.7609 29.8812C24.1016 28.5547 24.8422 26.7969 24.8516 24.9219L24.7859 16.5828C25.4234 17.075 26.1219 17.4875 26.8766 17.8016C28.0391 18.2984 29.2813 18.5516 30.5516 18.5516Z' fill='#F00044' /> <path d='M11.5297 18.8375C10.2031 20.15 9.44843 21.95 9.44843 23.8203C9.44843 24.8703 9.6828 25.8875 10.1187 26.8109C10.5641 27.4578 11.075 28.0625 11.6375 28.6063C10.9437 27.5047 10.5734 26.2297 10.5734 24.8984C10.5734 23.0281 11.3281 21.2281 12.6547 19.9109C13.9906 18.5844 15.7672 17.8484 17.6609 17.8344V16.8359C17.3094 16.7844 16.9484 16.7563 16.5875 16.7563C14.675 16.7609 12.8797 17.4969 11.5297 18.8375Z' fill='#08FFF9' /> <path d='M29.4734 14.7641V13.7609H29.4641C28.1609 13.7609 26.9609 13.3297 25.9953 12.5984C26.8344 13.7047 28.0625 14.4922 29.4734 14.7641Z' fill='#08FFF9' /> <path d='M17.5203 28.2641C17.9656 28.2875 18.3922 28.2266 18.7859 28.1C20.1453 27.6547 21.125 26.3891 21.125 24.8984L21.1297 19.3203V9.125H23.8109C23.7406 8.77344 23.7031 8.41719 23.6984 8.04688H20V18.2328L19.9953 23.8109C19.9953 25.3016 19.0156 26.5672 17.6563 27.0125C17.2625 27.1438 16.8359 27.2047 16.3906 27.1766C15.8234 27.1438 15.2938 26.975 14.8344 26.7031C15.4156 27.5984 16.4 28.2031 17.5203 28.2641Z' fill='#08FFF9' /> <path d='M29.4734 17.4734V14.7687C28.0625 14.4969 26.8344 13.7094 25.9953 12.6031C24.8891 11.7687 24.0969 10.5406 23.8156 9.12969H21.1344V19.3156L21.1297 24.8937C21.1297 26.3844 20.15 27.65 18.7906 28.0953C18.3969 28.2266 17.9703 28.2875 17.525 28.2594C16.4 28.1984 15.4203 27.5937 14.8437 26.7078C13.8641 26.1266 13.1984 25.0719 13.1797 23.8625C13.1516 21.9781 14.6891 20.4406 16.5922 20.4406C16.9672 20.4406 17.3281 20.5016 17.6656 20.6094V17.8344C15.7719 17.8484 13.9953 18.5844 12.6594 19.9109C11.3281 21.2281 10.5734 23.0281 10.5734 24.8984C10.5734 26.2297 10.9437 27.5047 11.6375 28.6062C12.35 29.3 13.1469 29.9 14.0141 30.4016C14.825 30.7109 15.6922 30.8703 16.5875 30.8703C16.9484 30.8703 17.3094 30.8422 17.6609 30.7906C19.1609 30.5703 20.5437 29.8812 21.6359 28.8031C22.9766 27.4766 23.7172 25.7187 23.7266 23.8437L23.7078 15.5047C24.3453 15.9969 25.0437 16.4094 25.7984 16.7234C26.9609 17.2203 28.2031 17.4734 29.4734 17.4734Z' fill='#010101' /> </g> <defs> <clipPath id='clip0_1_18'> <rect width='24' height='24' fill='white' transform='translate(8 8)' /> </clipPath> </defs> </svg>);",
            youtubeSvg:
              "echo htmlspecialchars(<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='40' height='40' rx='16' fill='#E02900' /> <path fill-rule='evenodd' clip-rule='evenodd' d='M29.3766 12.479C30.4092 12.7427 31.2225 13.5197 31.4985 14.5061C32 16.2941 32 20.0246 32 20.0246C32 20.0246 32 23.7552 31.4985 25.5432C31.2225 26.5296 30.4092 27.2742 29.3766 27.5379C27.505 28.017 20 28.017 20 28.017C20 28.017 12.495 28.017 10.6233 27.538C9.59074 27.2742 8.7775 26.5297 8.5015 25.5432C8 23.7553 8 20.0247 8 20.0247C8 20.0247 8 16.2941 8.5015 14.5061C8.7775 13.5197 9.59074 12.7428 10.6233 12.4791C12.495 12 20 12 20 12C20 12 27.505 12 29.3766 12.479ZM17.5459 16.6377V23.4119L23.8186 20.0248L17.5459 16.6377Z' fill='white' /> </svg>);",
          },
          year: "<?= date('Y') ?>",
          uk: {
            address: {
              place: "<?= get_site_option('contacts_address_uk', 'default-value' ) ?>",
              city: "<?= get_site_option('contacts_city_uk', 'default-value' ) ?>",
              country: "<?= get_site_option('contacts_country_uk', 'default-value' ) ?>",
            },
            contacts: "get_site_option('contacts_phone_uk', 'default-value' )",
            mail: "<?= get_site_option('contacts_email_uk', 'default-value' ) ?>",
            agreementList: [
              {
                text: 'Умови користування послугами',
                link: "<?= get_site_option('contacts_terms_link_uk', 'default-value' ) ?>",
              },
              {
                text: 'Політика конфіденційності',
                link: "<?= get_site_option('contacts_policy_link_uk', 'default-value' ) ?>",
              },
              {
                text: 'Відмова від відповідальності',
                link: "<?= get_site_option('contacts_disclaimer_link_uk', 'default-value' ) ?>",
              },
            ],
            socialLinks: "get_site_option('contacts_socials_uk', 'default-value' )",
          },
          pl: {
            address: {
              place: "<?= get_site_option('contacts_address_pl', 'default-value' ) ?>",
              city: "<?= get_site_option('contacts_city_pl', 'default-value' ) ?>",
              country: "<?= get_site_option('contacts_country_pl', 'default-value' ) ?>",
            },
            contacts: "get_site_option('contacts_phone_pl', 'default-value' )",
            mail: "<?= get_site_option('contacts_email_pl', 'default-value' ) ?>",
            agreementList: [
              {
                text: "Regulamin świadczenia odpłatnych usług <br class='hidden smOnly:block'> szkoleniowych goit polska",
                link: "<?= get_site_option('contacts_terms_link_pl', 'default-value' ) ?>",
              },
              {
                text: "Polityka prywatności serwisu internetowego <br class='hidden smOnly:block'> www.goit.global/pl",
                link: "<?= get_site_option('contacts_policy_link_pl', 'default-value' ) ?>",
              },
            ],
            socialLinks: "get_site_option('contacts_socials_pl', 'default-value' )",
          },
          ro: {
            address: {
              place: "<?= get_site_option('contacts_address_ro', 'default-value' ) ?>",
              city: "<?= get_site_option('contacts_city_ro', 'default-value' ) ?>",
              country: "<?= get_site_option('contacts_country_ro', 'default-value' ) ?>",
            },
            contacts: "get_site_option('contacts_phone_ro', 'default-value' )",
            mail: "<?= get_site_option('contacts_email_ro', 'default-value' ) ?>",
            agreementList: [
              {
                text: 'Termeni și condiții',
                link: "<?= get_site_option('contacts_terms_link_ro', 'default-value' ) ?>",
              },
              {
                text: 'Politica de confidențialitate',
                link: "<?= get_site_option('contacts_policy_link_ro', 'default-value' ) ?>",
              },
              {
                text: 'ANPC',
                link: "<?= get_site_option('contacts_disclaimer_link_ro', 'default-value' ) ?>",
              },
            ],
            socialLinks: "get_site_option('contacts_socials_ro', 'default-value' )",
          },
        },
      },
    }),
  ],
});
