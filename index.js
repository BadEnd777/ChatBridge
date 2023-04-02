// .../index.js
module.exports = {
    /**
     * @type {Client}
     * @example
     * const { Client } = require('@badend/chatbridge');
     * const client = new Client({
     *     accessToken: 'your_access_token',
     *     verifyToken: 'your_verify_token',
     *     // port: 3000 <- Optional
     * });
     */
    Client: require('./dist/Client').Client,
    Collection: require('./dist/Collection').Collection,
    /**
     * @type {QuickReplies}
     * @example
     * const { QuickReplies } = require('@badend/chatbridge');
     * 
     * const quickReplies = new QuickReplies('What\'s your favorite color?')
     *      .addQuickReply([
     *          // QuickReply object
     *      ]);
        */
    QuickReplies: require('./templates/QuickReplies').QuickReplies,
    /**
     * @type {QuickReply}
     * @example
     * const { QuickReply } = require('@badend/chatbridge');
     *      
     * const quickReply = new QuickReply('Red', 'red');
     * 
    /
    QuickReply: require('./templates/QuickReply').QuickReply,
    /**
     * @type {ButtonTemplate}
     * @example
     * const { ButtonTemplate } = require('@badend/chatbridge');
     * 
     * const buttonTemplate = new ButtonTemplate('What do you want to do next?')
     *      .addButtons([ // 3 buttons maximum
     *          // Button object
     *      ]);
     */
    ButtonTemplate: require('./templates/ButtonTemplate').ButtonTemplate,
    /**
     * @type {CouponTemplate}
     * @example
     * const { CouponTemplate } = require('@badend/chatbridge');
     * 
     * const coupon = new CouponTemplate()
     *     .setTitle('This is a coupon')
     *     .setSubtitle('This is a coupon subtitle')
     *     .setCouponCode('EXAMPLE_CODE')
     *     .setCouponUrl('https://www.example.com')
     *     .setCouponUrlButtonTitle('Open URL')
     *     .setCouponPreMessage("This is a coupon pre-message")
     *     .setImageUrl('https://www.example.com/image.png')
     *     .setPayload('coupon_payload');
     */
    CouponTemplate: require('./templates/CouponTemplate').CouponTemplate,
    /**
     * @type {FeedbackTemplate}
     * @example
     * const { FeedbackTemplate } = require('@badend/chatbridge');
     * 
     * const feedback = new FeedbackTemplate()
     *     .setTitle('This is a feedback')
     *     .setSubtitle('This is a feedback subtitle')
     *     .setButtonTitle('Send Feedback')
     *     .setExpiresInDays(3)
     *     .setBusinessPrivacyUrl('https://www.example.com')
    */
    FeedbackTemplate: require('./templates/FeedbackTemplate').FeedbackTemplate,
    /**
     * @type {FeedbackScreen}
     * @example
     * const { FeedbackScreen } = require('@badend/chatbridge');
     * 
     * const feedbackScreen = new FeedbackScreen()
     *      .addQuestions([
     *          // FeedbackQuestion object
     *      ]);
    */
    FeedbackScreen: require('./templates/FeedbackScreen').FeedbackScreen,
    /**
     * @type {FeedbackQuestion}
     * @example
     * const { FeedbackQuestion } = require('@badend/chatbridge');
     * 
     * const feedbackQuestion = new FeedbackQuestion()
     *      .setQuestionId('question_1')
     *      .setQuestionType('type')
     *      .setQuestionText('How likely are you to recommend us to a friend or colleague?')
     *      // .setFollowUp(new FeedbackFollowUp('free_form', 'What can we do to improve?')) <- Optional
     * 
    */
    FeedbackQuestion: require('./templates/FeedbackQuestion').FeedbackQuestion,
    /**
     * @type {FeedbackFollowUp}
     * @example
     * const { FeedbackFollowUp } = require('@badend/chatbridge');
     * 
     * const feedbackFollowUp = new FeedbackFollowUp('free_form', 'What can we do to improve?');
    */
    FeedbackFollowUp: require('./templates/FeedbackFollowUp').FeedbackFollowUp,
    /**
     * @type {FeedbackType}
     * @example
     * const { FeedbackType } = require('@badend/chatbridge');
     * 
     * const feedback = new FeedbackTemplate()
     *         // ...
     *         new FeedbackScreen()
     *             .addQuestions([
     *                 new FeedbackQuestion()
     *                     .setQuestionType(FeedbackType.NPS)
     *             ])
     *     ]);
    */
    FeedbackType: require('./templates/FeedbackType').FeedbackType,
    /**
     * @type {GenericTemplate}
     * @example
     * const { GenericTemplate } = require('@badend/chatbridge');
     * 
     * const generic = new GenericTemplate()
     *     .addElements([
     *          // GenericElement object
     *     ]);
    */
    GenericTemplate: require('./templates/GenericTemplate').GenericTemplate,
    /**
     * @type {GenericElement}
     * @example
     * const { GenericTemplate, GenericElement } = require('@badend/chatbridge');
     * 
     * const generic = new GenericTemplate()
     *     .addElements([
     *         new GenericElement('Title')
     *             .setImageUrl('https://www.example.com/image.png')
     *             .setSubtitle('Subtitle')
     *             .addButtons([
     *                  // Button object
     *             ]),
     *     ]);
    */
    GenericElement: require('./elements/GenericElement').GenericElement,
    /**
     * @type {MediaTemplate}
     * @example
     * const { MediaTemplate, MediaElement } = require('@badend/chatbridge');
     * 
     * const media = new MediaTemplate()
     *     .addElements([
     *          // MediaElement object
     *     ]);
    */
    MediaTemplate: require('./templates/MediaTemplate').MediaTemplate,
    /**
     * @type {MediaElement}
     * @example
     * const { MediaTemplate, MediaElement } = require('@badend/chatbridge');
     * 
     * const media = new MediaTemplate()
     *     .addElements([
     *         new MediaElement('image', 'https://www.facebook.com/username/photo/...')
     *             .addButtons([
     *                  // Button object
     *             ]),
     *     ]);
    */
    MediaElement: require('./elements/MediaElement').MediaElement,
    /**
     * @type {ReceiptTemplate}
     * @example
     * const { ReceiptTemplate } = require('@badend/chatbridge');
     * 
     * const receipt = new ReceiptTemplate('Stephanie Meyer', '12345678902', 'USD', 'Visa 2345')
     *     .setOrderUrl('http://petersapparel.parseapp.com/order?order_id=123456')
     *     .setTimestamp('1428444852')
     *     .setAddress('1 Hacker Way', '', 'Menlo Park', '94025', 'CA', 'US')
     *     .setSummary(75.00, 4.95, 6.19, 56.14)
     *     .addAdjustments([
     *          // Adjustment object
     *     ])
     *     .addElements([
     *          // ReceiptElement object
     *     ]);
    */
    ReceiptTemplate: require('./templates/ReceiptTemplate').ReceiptTemplate,
    /**
     * @type {ReceiptElement}
     * @example
     * const { ReceiptTemplate, ReceiptElement } = require('@badend/chatbridge');
     * 
     * const receipt = new ReceiptTemplate('Stephanie Meyer', '12345678902', 'USD', 'Visa 2345')
     *     .addElements([
     *          new ReceiptElement(
     *              'Classic White T-Shirt',
     *              '100% Soft and Luxurious Cotton',
     *              2,
     *              50,
     *              'USD',
     *              'http://petersapparel.parseapp.com/img/whiteshirt.png'
     *          ),
     *    ]);
    */
    ReceiptElement: require('./elements/ReceiptElement').ReceiptElement,
    /**
     * @type {Adjustment}
     * @example
     * const { ReceiptTemplate, Adjustment } = require('@badend/chatbridge');
     * 
     * const receipt = new ReceiptTemplate('Stephanie Meyer', '12345678902', 'USD', 'Visa 2345')
     *      .addAdjustments([
     *          new Adjustment('New Customer Discount', 20)
     *      ]);
    */
    Adjustment: require('./templates/Adjustment').Adjustment,
    /**
     * @type {PersistentMenu}
     * @example
     * const { PersistentMenu } = require('@badend/chatbridge');
     * 
     * const persistentMenu = new PersistentMenu()
     *      .addMenuItems('Item 1', 'payload_1');
    */
    PersistentMenu: require('./templates/PersistentMenu').PersistentMenu,
    /**
     * @type {CallButton}
     * @example
     * const { CallButton } = require('@badend/chatbridge');
     * 
     * const callButton = new CallButton('Call Us', '+16505551234');
    */
    CallButton: require('./buttons/CallButton').CallButton,
    /**
     * @type {PostbackButton}
     * @example
     * const { PostbackButton } = require('@badend/chatbridge');
     * 
     * const postbackButton = new PostbackButton('Postback Button', 'payload');
    */
    PostbackButton: require('./buttons/PostbackButton').PostbackButton,
    /**
     * @type {UrlButton}
     * @example
     * const { UrlButton } = require('@badend/chatbridge');
     * 
     * const urlButton = new UrlButton('Visit Website', 'https://www.example.com');
    */
    UrlButton: require('./buttons/UrlButton').UrlButton,
};