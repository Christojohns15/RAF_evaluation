/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/https', 'N/record', 'N/search', 'N/ui/serverWidget', 'N/url'],
    /**
 * @param{https} https
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 * @param{url} url
 */
    (https, record, search, serverWidget, url) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {
                if (scriptContext.request.method === 'GET') {
                    var form = serverWidget.createForm({
                        title: 'Akshaya Institute Enquiery Form'
                    });
                    form.clientScriptFieldId = 4068;
                    var namee = form.addField({
                        id: 'custpage_nameee',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Name',
                    });
                    var countryy = form.addField({
                        id: 'custpage_country',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Country',
                    });
                    var age = form.addField({
                        id: 'custpage_datee',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Age',
                    });
                    var phoneno = form.addField({
                        id: 'custpage_pphone',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone Number',
                    });
                    var emailid = form.addField({
                        id: 'custpage_emailll',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'Email',
                    });
                    var language = form.addField({
                        id: 'custpage_jj_languagecourse',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Language Course'
                    });
                    language.addSelectOption({
                        value: ' ',
                        text: ' '
                    });
                    language.addSelectOption({
                        value: '1',
                        text: 'English'
                    });
                    language.addSelectOption({
                        value: '2',
                        text: 'French'
                    });
                    language.addSelectOption({
                        value: '3',
                        text: 'German'
                    });
                    var base = form.addField({
                        id: 'custpage_currency',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Base Currency(in Rupees)',
                    });
                    var trans = form.addField({
                        id: 'custpage_transactioncurrency',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Transaction Currency',
                    });
                    var fee = form.addField({
                        id: 'custpage_feeamount',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Fee Amount',
                    });
                    var xchange = form.addField({
                        id: 'custpage_xchangerate',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Exchange rate',
                    });
                    var Transaction = form.addField({
                        id: 'custpage_trannoo',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Transaction Number',
                    });
                    form.addSubmitButton({
                        label: 'Submit'
                    });
                    scriptContext.response.writePage(form);
                }
                else if (scriptContext.request.method === 'POST') {
                    var request = scriptContext.request;
                    var name = request.parameters.custpage_nameee;
                    var country = request.parameters.custpage_country;
                    var age = request.parameters.custpage_datee;
                    var phone = request.parameters.custpage_pphone;
                    var email = request.parameters.custpage_emailll;
                    var languagee = request.parameters.custpage_jj_languagecourse;
                    var baseCurrency = request.parameters.custpage_currency;
                    var transactionCurrency = request.parameters.custpage_transactioncurrency;
                    var fee = request.parameters.custpage_feeamount;
                    var exchangeRate = request.parameters.custpage_xchangerate;
                    var transactionNumber = request.parameters.custpage_trannoo;
                    var customerRecord = record.create({
                        type: 'customrecord_jj_studentrec',
                        isDynamic: true
                    });
                    let customerr = request.parameters.customer;
                    log.debug(customerr);

                    let exchangert=freecurrencyapi.latest({
                        base_currency: 'INR',
                        currencies: transactionCurrency
                    }).then(response => {
                        console.log(response);
                    });

                    let exchangeAmount=exchangeRate*fee

                    customerRecord.setValue({
                        fieldId: 'name',
                        value: name
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_country',
                        value: country
                    });
                    customerRecord.setValue({
                        fieldId: '	custrecord_jj_stdage',
                        value: age
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_stdphone',
                        value: phone
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_emailstd',
                        value: email
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_courselang',
                        value: languagee
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_basecurrency',
                        value: baseCurrency
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_trancurrency',
                        value: transactionCurrency
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_fee_amount',
                        value: fee
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_exchangerate',
                        value: exchangeAmount
                    });
                    customerRecord.setValue({
                        fieldId: 'custpage_trannoo',
                        value: "QR001"
                    });
                    var customerId = customerRecord.save();
                    var form = serverWidget.createForm({
                        title: 'Customer Information Submitted'
                    });
                    form.addField({
                        id: 'custpage_info',
                        type: serverWidget.FieldType.INLINEHTML,
                        label: 'Customer Information'
                    }).defaultValue = '<p>Fee Details: ' + customerId + '</p>' +
                    '<p>Name: ' + name + '</p>' +
                    '<p>Country: ' + country + '</p>' +
                    '<p>Age: ' + age + '</p>' +
                    '<p>Phone: ' + phone + '</p>' +
                    '<p>Email: ' + email + '</p>' +
                    '<p>Language: ' + language + '</p>' +
                    '<p>BaseCurrency: ' + baseCurrency + '</p>' +
                    '<p>TransactionCurrency: ' + transactionCurrency + '</p>' +
                    '<p>FeeAmount: ' + fee + '</p>' +
                    '<p>ExchangeRate: ' + exchangeRate + '</p>' +
                    '<p>Transactionno.: ' + customerr + '</p>';
                    scriptContext.response.writePage(form);
                }
            }
            catch (error) {
                log.debug("Error in code" + error);
            }
        }

        return { onRequest }

    });
