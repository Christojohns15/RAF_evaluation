/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/**********************************************************************************
 * RAF EVALUATION
 *
 *
 * ********************************************************************************
 *
 * ********************
 * company name
 *
 * Author: Jobin and Jismi IT Services
 *
 *
 * Date Created: 11-July-2024
 *
 * Description: This script is for getting the student details from form and to save custom record with detailed fees.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 03-July-2024: Created the initial build by JJ0353
 *
 *
 *
 **************/
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
                    let form = serverWidget.createForm({
                        title: 'Akshaya Institute Enquiery Form'
                    });
                    form.clientScriptFieldId = 4068;
                    let namee = form.addField({
                        id: 'custpage_nameee',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Name',
                    });
                    let countryy = form.addField({
                        id: 'custpage_country',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Country',
                    });
                    let age = form.addField({
                        id: 'custpage_datee',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Age',
                    });
                    let phoneno = form.addField({
                        id: 'custpage_pphone',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone Number',
                    });
                    let emailid = form.addField({
                        id: 'custpage_emailll',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'Email',
                    });
                    let language = form.addField({
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
                    let base = form.addField({
                        id: 'custpage_currency',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Base Currency(in Rupees)',
                    });
                    let trans = form.addField({
                        id: 'custpage_transactioncurrency',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Transaction Currency',
                    });
                    trans.addSelectOption({
                        value: ' ',
                        text: ' '
                    });
                    trans.addSelectOption({
                        value: '1',
                        text: 'USD'
                    });
                    trans.addSelectOption({
                        value: '2',
                        text: 'AUD'
                    });
                    trans.addSelectOption({
                        value: '3',
                        text: 'CAD'
                    });
                    trans.addSelectOption({
                        value: '3',
                        text: 'EUR'
                    });
                    let fee = form.addField({
                        id: 'custpage_feeamount',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Fee Amount',
                    });
                    let xchange = form.addField({
                        id: 'custpage_xchangerate',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Exchange rate',
                    });
                    let Transaction = form.addField({
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
                    let request = scriptContext.request;
                    let name = request.parameters.custpage_nameee;
                    let country = request.parameters.custpage_country;
                    let age = request.parameters.custpage_datee;
                    let phone = request.parameters.custpage_pphone;
                    let email = request.parameters.custpage_emailll;
                    let languagee = request.parameters.custpage_jj_languagecourse;
                    let baseCurrency = request.parameters.custpage_currency;
                    //let transactionCurrency = request.parameters.custpage_transactioncurrency;
                    let fee = request.parameters.custpage_feeamount;
                    let exchangeRate = request.parameters.custpage_xchangerate;
                    let transactionNumber = request.parameters.custpage_trannoo;
                    let customerRecord = record.create({
                        type: 'customrecord_jj_studentrec',
                        isDynamic: true
                    });
                    let transactionCurrency = request.parameters.transactionCurrency;
                    log.debug(transactionCurrency);
                    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_wIEyVln5tqoBdgokB6U0Qcx3fSv0DEIbwo394Q2L')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        });

                    let exchangert = freecurrencyapi.latest({
                        base_currency: 'INR',
                        currencies: transactionCurrency
                    }).then(response => {
                        console.log(response);
                    });
                    let exchangeAmount = exchangeRate * fee



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
                        value: "INR"
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
                    let customerId = customerRecord.save();
                    let form = serverWidget.createForm({
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
                    '<p>Transactionno.: ' + transactionNumber+ '</p>';
                    scriptContext.response.writePage(form);
                }
            }
            catch (error) {
                log.debug("Error in code" + error);
            }
        }

        return { onRequest }

    });
