## Installation
### Requirements
- Node.js >= 10

Just install the depedencies and you ready to go.

```bash
npm install
```


## Development
There's no transpilation process, we code it using commonjs / vanilla, just execute dev script to run in watch mode.

```bash
npm run dev
```

## Project Structure
### Folders & Files
- data

  contains static files html and json, html for the web and json for mobile app.

- public

  contains assets, we can put images / videos / fonts in here

- index.js

  all logic lives in here, routing and http handler.

### Routes
- POST `/graphql/v1`

handling request for graphql v1, some of pages need this endpoint but in practice we don't expect any hit. it is exist just for safety purpose

- POST `/graphql/v2`

dynamic-content request come to this path, it always return json file that located in `data/graphql.json` that contains instruction for mobile app to render ui for certain slug/page. in practice we just use it to render the landing page because the other page handled in web.

- GET `/(android/ios)/prefetch`

it returns static prefetch data, our app has prefetch mechanism where we start the request of initial data as soon as possible even before the js engine up. it happen in java world. if the request aren't finished after js engine up then js also requesting this endpoint and race againts it. so if we modify data in `data/graphql.json` we have to do also in `data/prefetch.json`

- GET `/android/v2/updateInfo` or `/ios/updateinfo`

this endpoint telling our mobile app if there's any bundle update that need to be downloaded, we always return error 500 for this that means no bundle update.

- GET `/faq`

returns faq.html

- GET `*`

returns index.html

## Widget Types

In order to render dynamic-page properly for mobile app as we did for the current landing page, we have to respect the data structure of dynamic content. if we open `data/graphql.json` we will see a lot of information in there, but actually we just need to focusing on some part only if we just want to modify the UI.

### Field paths
- `data.dynamic.content` -> Array of `Parent Widget`
- `data.dynamic.content[index].content` -> Array of `Child Widget`

### Parent Widgets
actually there's two kind of parent widget that available, but we only limited to use one type for this context, which is `Card` widget. here is the sample
```json
{
  "id": "replace with unique string",
  "type": "Card",
  "offset": 0,
  "nextContentOffset": null,
  "data": {
    "appearance": null,
    "actionLink": null,
    "actionTitle": null,
    "title": "",
    "context": {
      "widgetType": "Card",
      "type": "Card",
      "name": null,
      "widgetPosition": "0",
      "widgetId": "a7cdca6c-e7ac-4e90-baf4-5bada1df2e0d",
      "contextDataPath": null,
      "additionalData": null,
      "__typename": "TrackingContext"
    },
    "layout": {
      "columns": 1,
      "rows": 1,
      "columnSize": null,
      "rowSize": null,
      "marginTop": null,
      "marginRight": null,
      "marginBottom": null,
      "marginLeft": null,
      "paddingTop": "medium",
      "paddingRight": null,
      "paddingBottom": null,
      "paddingLeft": null,
      "__typename": "WidgetLayout"
    },
    "__typename": "WidgetData"
  },
  "content": [],
  "__typename": "Wrapper"
}
```

### Child Widgets
Child Widget is widgets that placed as contents of Parent Widget, in field `content` as an array. the data structure of one child widget with another almost identical, it only different in field `entity` and `__typename` because it depends on the element type. for example widget image will have imageUrl but text widget doesn't.

please refer the options to the actual code because widget has a lot of options

- all widget type: https://github.com/salestock/ssource/tree/master/www/src/app/dynamicWidgets
- appearances: https://github.com/salestock/ssource/blob/master/www/src/app/dynamicWidgets/utils/AppearanceUtils.js

here is the template of several widgets that relevant / in used for landing page

#### Image Widget
```json
{
  "id": "info_sorabel_2_0_Image_product_score_desc",
  "offset": 0,
  "type": "Image",
  "data": {
    "appearance": null,
    "actionLink": null,
    "context": {
      "type": "Image",
      "widgetType": "Image",
      "name": null,
      "widgetPosition": "0",
      "widgetId": "bb07d6d3-364d-41fc-ab79-4946174e7e6d",
      "contextDataPath": [
        "title:data.entity.title",
        "url:data.entity.url"
      ],
      "additionalData": null,
      "__typename": "TrackingContext"
    },
    "layout": {
      "columns": null,
      "rows": null,
      "columnSize": 1,
      "rowSize": 1,
      "marginTop": null,
      "marginRight": null,
      "marginBottom": null,
      "marginLeft": null,
      "paddingTop": null,
      "paddingRight": null,
      "paddingBottom": "small",
      "paddingLeft": null,
      "__typename": "WidgetLayout"
    },
    "entity": {
      "fullUrl": "https://www.sorabel.com/signature.jpg",
      "width": 481,
      "height": 130,
      "title": null,
      "__typename": "ImageV2"
    },
    "__typename": "ImageWidgetData"
  },
  "__typename": "ImageWidget"
}
```

#### Text Widget with Action

```json
{
  "id": "info_sorabel_3_0_Text_product_score_desc",
  "offset": 0,
  "type": "Text",
  "data": {
    "appearance": ["fg:white"],
    "actionTitle": "Belanja Sorabel di Shopee",
    "actionLink": "https://shopee.co.id/sorabelofficial?utm_source=sorabelwebapp&utm_medium=seller&utm_campaign=s315322431_SS_ID_OTHR_sorabel2shopee&utm_content=hpbutton",
    "context": {
      "type": "Text",
      "widgetType": "Text",
      "name": null,
      "widgetPosition": "0",
      "widgetId": "9ad15c35-20b1-494a-8ffe-3bf68408e237",
      "contextDataPath": [
        "content:data.entity.content",
        "title:data.entity.title"
      ],
      "additionalData": null,
      "__typename": "TrackingContext"
    },
    "layout": {
      "columns": null,
      "rows": null,
      "columnSize": 1,
      "rowSize": 1,
      "marginTop": null,
      "marginRight": null,
      "marginBottom": null,
      "marginLeft": null,
      "paddingTop": null,
      "paddingRight": null,
      "paddingBottom": null,
      "paddingLeft": null,
      "__typename": "WidgetLayout"
    },
    "entity": {
      "title": "",
      "content": "<p>.</p>",
      "__typename": "TextType"
    },
    "__typename": "TextWidgetData"
  },
  "__typename": "TextWidget"
}
```

#### Text Widget

```json
{
  "id": "info_sorabel_1_0_Text_product_score_desc",
  "offset": 0,
  "type": "Text",
  "data": {
    "appearance": ["align:left"],
    "actionTitle": null,
    "actionLink": null,
    "context": {
      "type": "Text",
      "widgetType": "Text",
      "name": null,
      "widgetPosition": "0",
      "widgetId": "4b67dc9a-0f4e-4491-a085-098860df67fe",
      "contextDataPath": [
        "content:data.entity.content",
        "title:data.entity.title"
      ],
      "additionalData": null,
      "__typename": "TrackingContext"
    },
    "layout": {
      "columns": null,
      "rows": null,
      "columnSize": 1,
      "rowSize": 1,
      "marginTop": null,
      "marginRight": null,
      "marginBottom": null,
      "marginLeft": null,
      "paddingTop": "small",
      "paddingRight": null,
      "paddingBottom": "small",
      "paddingLeft": null,
      "__typename": "WidgetLayout"
    },
    "entity": {
      "title": "",
      "content": "<p>Hi Sista! </p><p>Saat ini, Sorabel tengah melakukan peningkatan sistem untuk memberikan layanan yang lebih baik untuk Sista. Jadi, untuk sementara waktu website dan app Sorabel belum bisa digunakan untuk berbelanja ya, Sis.</p><p>Tapi jangan khawatir, karena Sorabel sudah bekerja sama dengan Shopee untuk membuka Sorabel Official Store di Shopee Mall. Jadi Sista bisa berbelanja koleksi Sorabel di Shopee.</p><p>Untuk pesanan Sista yang dibuat sebelum tanggal 22 Oktober 2020  tetap diproses Sorabel kok Sis. Sista bisa cek pesanannya dengan klik tautan dibawah dan memasukan ID Pesanan Sista, atau Sista bisa menghubungi Sorabel lewat Whatsapp ya. </p><p>Sebagai apresiasi untuk Sista yang udah setia belanja di Sorabel, ada voucher spesial untuk Sista nih. Pakai kodenya dan dapatkan disc 25% s/d 100rb. Ikuti juga toko Sorabel Official di Shopee Mall ya, biar nggak ketinggalan update terbaru ;)</p>",
      "__typename": "TextType"
    },
    "__typename": "TextWidgetData"
  },
  "__typename": "TextWidget"
}
],
"__typename": "Wrapper"
}
```

## Deployment

there's two options for deployment, using Docker or pm2. 
but currently we use pm2 in the current server, here is step that we do to deploy changes

### Deploy latest changes

```bash
ssh -i sorabel_key.pem ubuntu@18.138.33.100
cd /var/www/sorabel.com
sudo pull origin master
sudo pm2 restart sorabel
```

### check service status

```bash
sudo pm2 list
```
