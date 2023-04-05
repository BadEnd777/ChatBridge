<div align="center">
  <h1>Chat Bridge</h1>
  <p><strong>Chat Bridge</strong> is a library that help you to create chatbots for Facebook Messenger. Just write a few lines of code and you can create a chatbot. It is based on the Webhook API and uses Fastify as a server.</p>

  <a href="https://www.npmjs.com/package/@badend/chatbridge"><img src="https://img.shields.io/npm/v/@badend/chatbridge?style=flat-square" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/@badend/chatbridge"><img src="https://img.shields.io/npm/dt/@badend/chatbridge?style=flat-square" alt="NPM Downloads"></a>
  <a href="https://github.com/BadEnd777/ChatBridge"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBadEnd777%2FChatBridge&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=visit&edge_flat=false" alt="hits"></a>

  [Credits](#credits) - [Installation](#installation) - [Usage](#usage) - [API](#api) - [Templates](#templates) - [License](#license)
</div>

## Credits

- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework, for Node.js
- [Undici](https://undici.nodejs.org/#/) - Fast and modern HTTP/1.1 and HTTP/2 client

## Installation

To install the library, run the following command:

```bash
npm install @badend/chatbridge
```
<!--  
constructor({ accessToken, verifyToken, webHookPath, port, host }) {
    this.events = {};
    this.app = fastify();
    this.accessToken = accessToken;
    this.verifyToken = verifyToken;
    this.webHookPath = webHookPath || "/webhook";
    this.port = port || 3000;
    this.host = host || "localhost";
}
-->

## Usage

To use the library, you need to create a new instance of the `Client` class and pass it the configuration object. The configuration object must contain the following properties:

- `accessToken` - Page Access Token of your Facebook App
- `verifyToken` - Verify Token of your Facebook App
- `webHookPath` - Path to the webhook (default: `/webhook`)
- `port` - Port on which the server will be launched (default: `3000`)
- `host` - Host on which the server will be launched (default: `localhost`)

```js
const { Client } = require("@badend/chatbridge");

const client = new Client({
  accessToken: "YOUR_ACCESS_TOKEN",
  verifyToken: "YOUR_VERIFY_TOKEN",
  // webHookPath: "/webhook", // default
  // port: 3000, // default
  // host: "localhost", // default (only for development) or "0.0.0.0" (for production)
});

client.on("message", event => {
  const { sender, message } = event;
  const { text } = message;
  const { id } = sender;

  client.sendTextMessage(id, `You wrote: ${text}`);
});

client.start(); // Start the server
```

## API

### `Client`

The `Client` class is the main class of the library. It is responsible for creating a webhook and handling messages.

#### `constructor(options)`

Creates a new instance of the `Client` class.

| Parameter             | Type     | Description                                                 |
| :-------------------- | :------- | :---------------------------------------------------------- |
| `options`             | `Object` | Configuration object                                        |
| `options.accessToken` | `string` | Page Access Token of your Facebook App                      |
| `options.verifyToken` | `string` | Verify Token of your Facebook App                           |
| `options.webHookPath` | `string` | Path to the webhook (default: `/webhook`)                   |
| `options.port`        | `number` | Port on which the server will be launched (default: `3000`) |

#### `start(callback)`

Starts the server.

| Parameter  | Type       | Description       |
| :--------- | :--------- | :---------------- |
| `callback` | `Function` | Callback function |

#### `on(event, callback)`

Adds a listener to the specified event.

| Parameter  | Type       | Description       |
| :--------- | :--------- | :---------------- |
| `event`    | `string`   | Event name        |
| `callback` | `Function` | Callback function |

Output:

```js
{
  sender: {
    id: "USER_ID",
  },
  recipient: {
    id: "PAGE_ID",
  },
  timestamp: 1234567890,
  // Message, Postback, Template, etc.
}
```

#### `getUserInfo(userId)`

Returns information about the user.

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `userId`  | `string` | User ID     |

#### `sendRequest(method, path, data)`

Sends a request to the Facebook API.
Example:

```js
// Default url: https://graph.facebook.com/v16.0/me/
client.sendRequest("POST", "messages", {
  recipient: {
    id: "USER_ID",
  },
  message: {
    text: "Hello!",
  },
});
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------- |
| `method`  | `string` | Request method |
| `path`    | `string` | Request path   |
| `data`    | `Object` | Request data   |

### `Collection`

The `Collection` class is a collection of items.

#### `constructor()`

Creates a new instance of the `Collection` class.

#### `add(item)`

Adds an item to the collection.

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `item`    | `Object` | Item        |

#### `get(name)`

Returns an item from the collection.

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `name`    | `string` | Item name   |

Example:

```js
const { Collection } = require("@badend/chatbridge");

const collection = new Collection();

collection.add({
  name: "item",
  value: 1,
});

console.log(collection.get("item")); // { name: 'item', value: 1 }
```

## Templates

The library has a built-in template system. To use it, you need to create a new instance of the `QuickReplies`, `ButtonTemplate`, `CouponTemplate`, `FeedbackTemplate`, `GenericTemplate`, `MediaTemplate`, `ReceiptTemplate` or `PersistentMenu` class and pass it the configuration object.

### `QuickReplies`

The `QuickReplies` class is responsible for creating quick replies. Use with the `sendApi` method.

```js
const { QuickReplies, QuickReply } = require('@badend/chatbridge');

const quickReplies = new QuickReplies('Select an option:')
  .addQuickReply([
      new QuickReply('Option 1')
          .setPayload('option_1'),
          .setImageUrl('https://example.com/image.png'), // Optional
      new QuickReply('Option 2')
          .setPayload('option_2')
  ]);

client.sendApi('USER_ID', quickReplies);
```

### `ButtonTemplate`

The `ButtonTemplate` class is responsible for creating a button template. Use with the `sendApi` method.

```js
const {
  ButtonTemplate,
  UrlButton,
  PostbackButton,
  CallButton,
} = require("@badend/chatbridge");

const button = new ButtonTemplate("Select an option:").addButton([
  // 3 buttons max
  new UrlButton("Open website", "https://example.com"),
  new PostbackButton("Send payload", "payload"),
  new CallButton("Call", "+1234567890"),
]);

client.sendApi("USER_ID", button);
```

### `CouponTemplate`

The `CouponTemplate` class is responsible for creating a coupon template. Use with the `sendApi` method.

```js
const { CouponTemplate } = require("@badend/chatbridge");

const coupon = new CouponTemplate()
  .setTitle("Coupon")
  .setSubtitle("Subtitle")
  .setCouponCode("CODE")
  .setCouponUrl("https://example.com/coupon")
  .setCouponUrlButtonTitle("Open coupon")
  .setCouponPreMessage("Pre message")
  .setImageUrl("https://example.com/image.png")
  .setPayload("payload");

client.sendApi("USER_ID", coupon);
```

### `FeedbackTemplate`

The `FeedbackTemplate` class is responsible for creating a feedback template. Use with the `sendApi` method.

```js
const {
  FeedbackTemplate,
  FeedbackScreen,
  FeedbackQuestion,
  FeedbackFollowUp,
  FeedbackType,
} = require("@badend/chatbridge");

const feedback = new FeedbackTemplate()
  .setTitle("This is a feedback")
  .setSubtitle("This is a feedback subtitle")
  .setButtonTitle("Send Feedback")
  .setExpiresInDays(3)
  .setBusinessPrivacyUrl("https://www.example.com")
  .addFeedbackScreens([
    new FeedbackScreen().addQuestions([
      new FeedbackQuestion()
        .setQuestionId("question_1")
        .setQuestionType(FeedbackType.NPS)
        .setQuestionText(
          "How likely are you to recommend us to a friend or colleague?"
        )
        .setFollowUp(
          new FeedbackFollowUp("free_form", "What can we do to improve?")
        ),
    ]),
  ]);

client.sendApi("USER_ID", feedback);
```

### `GenericTemplate`

The `GenericTemplate` class is responsible for creating a generic template. Use with the `sendApi` method.

```js
const { GenericTemplate, GenericElement } = require("@badend/chatbridge");

const generic = new GenericTemplate().addElements([
  new GenericElement("Title")
    .setImageUrl("https://www.example.com/image.png")
    .setSubtitle("Subtitle"),
    .addButtons([
      new UrlButton("Open website", "https://example.com"),
      new PostbackButton("Send payload", "payload"),
      new CallButton("Call", "+1234567890"),
    ]),
]);

client.sendApi("USER_ID", generic);
```

### `MediaTemplate`

The `MediaTemplate` class is responsible for creating a media template. Use with the `sendApi` method.

```js
const { MediaTemplate, MediaElement } = require("@badend/chatbridge");

const media = new MediaTemplate().addElements([
  new MediaElement("<image/video>", "https://example.com/image.png").addButtons(
    [
      new UrlButton("Open website", "https://example.com"),
      new PostbackButton("Send payload", "payload"),
      new CallButton("Call", "+1234567890"),
    ]
  ),
]);

client.sendApi("USER_ID", media);
```

### `ReceiptTemplate`

The `ReceiptTemplate` class is responsible for creating a receipt template. Use with the `sendApi` method.

```js
const {
  ReceiptTemplate,
  ReceiptElement,
  Adjustment,
} = require("@badend/chatbridge");

const {
  ReceiptTemplate,
  ReceiptElement,
  Adjustment,
} = require("@badend/chatbridge");

const receipt = new ReceiptTemplate(
  "Stephanie Meyer",
  "12345678902",
  "USD",
  "Visa 2345"
)
  .setOrderUrl("http://example.com/order/123456")
  .setTimestamp("1428444852")
  .setAddress("1 Hacker Way", "", "Menlo Park", "94025", "CA", "US")
  .setSummary(75.0, 4.95, 6.19, 56.14)
  .addAdjustments([
    new Adjustment("New Customer Discount", 20),
    new Adjustment("$10 Off Coupon", 10),
  ])
  .addElements([
    new ReceiptElement(
      "Classic White T-Shirt",
      "100% Soft and Luxurious Cotton",
      2,
      50,
      "USD",
      "http://example.com/white-t-shirt.png"
    ),
    new ReceiptElement(
      "Classic Gray T-Shirt",
      "100% Soft and Luxurious Cotton",
      1,
      25,
      "USD",
      "http://example.com/gray-t-shirt.png"
    ),
  ]);

client.sendApi("USER_ID", receipt);
```

### `PersistentMenu`

The `PersistentMenu` class is responsible for creating a persistent menu. Use with the `setPersistentMenu` method.

```js
const { PersistentMenu } = require("@badend/chatbridge");

const menu = new PersistentMenu()
  .addMenuItems('Get Started', 'GET_STARTED'),
  .addMenuItems('Website', 'https://example.com', 'full');

client.setPersistentMenu(menu);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

<hr />