## Chat Bridge

[![npm](https://img.shields.io/npm/v/@badend/chatbridge)](https://www.npmjs.com/package/@badend/chatbridge)
[![npm](https://img.shields.io/npm/dt/@badend/chatbridge)](https://www.npmjs.com/package/@badend/chatbridge)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBadEnd777%2FChatBridge&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visit&edge_flat=false)](https://hits.seeyoufarm.com)

Chat Bridge is a library that allows you to create chatbots for Facebook Messenger. It is based on the Webhook API and uses Fastify as a server.

### Table of Contents

- [Installation](#installation)
- [Credits](#credits)
- [Usage](#usage)
- [API](#api)
  - [Client](#client)
    - [Constructor](#constructor)
    - [Methods](#methods)
    - [Events](#events)
  - [Collection](#collection)
    - [Constructor](#constructor-1)
    - [Methods](#methods-1)
  - [PersistentMenu](#persistentmenu)
    - [Constructor](#constructor-2)
    - [Methods](#methods-2)
- [Templates](#templates)
    - [QuickReplies](#quickreplies)
    - [ButtonTemplate](#buttontemplate)
    - [CouponTemplate](#coupontemplate)
    - [FeedbackTemplate](#feedbacktemplate)
    - [GenericTemplate](#generictemplate)
    - [MediaTemplate](#mediatemplate)
    - [ReceiptTemplate](#receipttemplate)
- [License](#license)

### Installation

This project is available on [npm](https://www.npmjs.com/package/@badend/chatbridge). To install it, run the following command:

```bash
npm install @badend/chatbridge
```

### Credits

This project uses the following packages:

- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [fastify](https://www.npmjs.com/package/fastify) - Fast and low overhead web framework, for Node.js

### Usage

The following example shows how to create a simple chatbot that responds to the user's messages with a greeting.

```javascript
const { Client, Collection } = require('@badend/chatbridge');

const client = new Client({
    accessToken: 'YOUR_ACCESS_TOKEN',
    verifyToken: 'YOUR_VERIFY_TOKEN',
    // port: 3000 <-- optional
});

client.on('message', event => {
    const { sender, message } = event;
    client.sendTextMessage(sender.id, `Hello, ${message.text}!`);
});

client.start(); // The server will create a webhook at https://<your-domain>/webhook
```

### API

#### Client

The Client class is the main class of the library. It is responsible for handling the webhook and sending messages to the user.

##### Constructor

The constructor takes in the following parameters:

- `accessToken` - The access token of the Facebook page.
- `verifyToken` - The verify token of the Facebook page.
- `port` - The port to listen to.

##### Methods

- `setGreetings(text)` - This method is used to set the greetings text. It takes in the following parameters:
    - `text` - The greetings text.
- `setGetStarted(payload)` - This method is used to set the get started button. It takes in the following parameters:
    - `payload` - The payload of the get started button.
- `sendAction(sender_psid, action)` - This method is used to send actions to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `action` - The action to be sent to the user.
- `sendTypingOn(sender_psid)` - This method is used to send typing on to the user.
- `sendTypingOff(sender_psid)` - This method is used to send typing off to the user.
- `sendMarkSeen(sender_psid)` - This method is used to send mark seen to the user.
- `sendPersistentMenu(sender_psid, menu)` - This method is used to send persistent menus to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `menu` - The persistent menu to be sent to the user.
- `callSendAPI(sender_psid, response)` - This method is used to send messages to the user. It takes in the following parameters:
  - `sender_psid` - The sender id of the user.
  - `response` - The message to be sent to the user.
- `sendTextMessage(sender_psid, text)` - This method is used to send text messages to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `text` - The text to be sent to the user.
- `sendImageMessage(sender_psid, url)` - This method is used to send image messages to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `url` - The url of the image to be sent to the user.
- `sendVideoMessage(sender_psid, url)` - This method is used to send video messages to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `url` - The url of the video to be sent to the user.
- `sendAudioMessage(sender_psid, url)` - This method is used to send audio messages to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `url` - The url of the audio to be sent to the user.
- `sendFileMessage(sender_psid, url)` - This method is used to send file messages to the user. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
    - `url` - The url of the file to be sent to the user.
- `getUserProfile(sender_psid)` - This method is used to get the user profile. It takes in the following parameters:
    - `sender_psid` - The sender id of the user.
- `getPageInfo()` - This method is used to get the page info.
- `start(callback)` - This method is used to start the server.

##### Events

- `message` - This event is emitted when the user sends a message to the bot.
- `postback` - This event is emitted when the user clicks on a button.
- `quick_reply` - This event is emitted when the user clicks on a quick reply.
- `template` - This event is emitted when the user clicks on a template.

#### Collection

The Collection class is used to organize commands and handlers.

##### Constructor

The constructor takes in no parameters.

##### Methods

- `add(name, command)` - This method is used to add a command to the collection. It takes in the following parameters:
  - `name` - The name of the command.
  - `command` - The command to be added.
- `get(name)` - This method is used to get a command from the collection. It takes in the following parameters:
    - `name` - The name of the command.
- `execute(name, ...args)` - This method is used to execute a command from the collection. It takes in the following parameters:
    - `name` - The name of the command.
    - `...args` - The arguments to be passed to the command.

#### PersistentMenu

The PersistentMenu class is used to create persistent menus.
Work with `sendPersistentMenu` method of the `Client` class.

##### Constructor

The constructor takes in the following parameters:

- `psid` - The psid of the user.

##### Methods

- `addCallToAction(title, payload, webviewHeightRatio)` - This method is used to add a call to action to the menu. It takes in the following parameters:
    - `title` - The title of the call to action.
    - `payload` - The payload of the call to action.
    - `webviewHeightRatio` - The webview height ratio of the call to action.

### Templates

This framework provides a set of templates that can be used to send messages to the user. These templates are used by the `QuickReplies`, `ButtonTemplate`, `CouponTemplate`, `FeedbackTemplate`, `GenericTemplate`, `MediaTemplate` and `ReceiptTemplate` classes. All templates use the `callSendAPI` method to send messages to the user.

#### QuickReplies

```javascript
const { QuickReplies, QuickReply } = require('@badend/chatbridge');

const quickReplies = new QuickReplies('What\'s your favorite color?')
    .addQuickReply([
        new QuickReply('Red')
            .setPayload('DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED')
            .setImageUrl('https://placehold.co/50x50/ff0000/ffffff?text=Red'),
        new QuickReply('Green')
            .setPayload('DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN')
            .setImageUrl('https://placehold.co/50x50/00ff00/ffffff?text=Green'),
    ]);
```

#### ButtonTemplate

```javascript
const { ButtonTemplate, UrlButton, PostbackButton, CallButton } = require('@badend/chatbridge');

const button = new ButtonTemplate('What do you want to do next?')
    .addButtons([ // 3 buttons maximum
        new UrlButton('Open URL', 'https://www.example.com'),
        new PostbackButton('Trigger Postback', 'DEVELOPER_DEFINED_PAYLOAD'),
        new CallButton('Call Phone', '0123456789'),
    ]);
```

#### CouponTemplate

```javascript
const { CouponTemplate } = require('@badend/chatbridge');

const coupon = new CouponTemplate()
    .setTitle('This is a coupon')
    .setSubtitle('This is a coupon subtitle')
    .setCouponCode('CODE123')
    .setCouponUrl('https://www.example.com')
    .setCouponUrlButtonTitle('Open URL')
    .setCouponPreMessage("This is a coupon pre-message")
    .setImageUrl('https://placehold.co/1000x1000/c9c9c9/000000?text=Image');
    .setPayload('DEVELOPER_DEFINED_PAYLOAD');
```

#### FeedbackTemplate

```javascript
const { FeedbackTemplate, FeedbackScreen, FeedbackQuestion, FeedbackFollowUp, FeedbackType } = require('@badend/chatbridge');

const feedback = new FeedbackTemplate()
    .setTitle('This is a feedback')
    .setSubtitle('This is a feedback subtitle')
    .setButtonTitle('Send Feedback')
    .setExpiresInDays(3)
    .setBusinessPrivacyUrl('https://www.example.com')
    .addFeedbackScreens([
        new FeedbackScreen()
            .addQuestions([
                new FeedbackQuestion()
                    .setQuestionId('question_1')
                    .setQuestionType(FeedbackType.NPS)
                    .setQuestionText('How likely are you to recommend us to a friend or colleague?')
                    .setFollowUp(new FeedbackFollowUp('free_form', 'What can we do to improve?')), // Optional
            ])
    ]);
```

#### GenericTemplate

```javascript
const { GenericTemplate, GenericElement } = require('@badend/chatbridge');

const generic = new GenericTemplate()
    .addElements([
        new GenericElement('Title')
            .setImageUrl('https://placehold.co/1000x1000/c9c9c9/000000?text=Image')
            .setSubtitle('Subtitle')
            /* .addButtons([ // Optional
                new UrlButton('Open URL', 'https://www.google.com'),
                new PostbackButton('Trigger Postback', 'DEVELOPER_DEFINED_PAYLOAD'),
            ]), */
    ]);
```

#### MediaTemplate

```javascript
const { MediaTemplate, MediaElement } = require('@badend/chatbridge');

const media = new MediaTemplate()
    .addElements([
        new MediaElement('image', 'https://www.facebook.com/borntodev/photos/a.830302417028053/6193246474066927/')
            /* .addButtons([ // Optional
                new UrlButton('Open URL', 'https://www.google.com'),
                new PostbackButton('Trigger Postback', 'DEVELOPER_DEFINED_PAYLOAD'),
            ]), */
    ]);
```

#### ReceiptTemplate

```javascript
const { ReceiptTemplate, ReceiptElement, Adjustment } = require('@badend/chatbridge');

const receipt = new ReceiptTemplate('Stephanie Meyer', '12345678902', 'USD', 'Visa 2345')
    .setOrderUrl('http://petersapparel.parseapp.com/order?order_id=123456')
    .setTimestamp('1428444852')
    .setAddress('1 Hacker Way', '', 'Menlo Park', '94025', 'CA', 'US')
    .setSummary(75.00, 4.95, 6.19, 56.14)
    .addAdjustments([
        new Adjustment('New Customer Discount', 20),
        new Adjustment('$10 Off Coupon', 10)
    ])
    .addElements([
        new ReceiptElement(
            'Classic White T-Shirt',
            '100% Soft and Luxurious Cotton',
            2,
            50,
            'USD',
            'http://petersapparel.parseapp.com/img/whiteshirt.png'
        ),
        new ReceiptElement(
            'Classic Gray T-Shirt',
            '100% Soft and Luxurious Cotton',
            1,
            25,
            'USD',
            'http://petersapparel.parseapp.com/img/grayshirt.png'
        )
    ]);
```

### License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) for details.
