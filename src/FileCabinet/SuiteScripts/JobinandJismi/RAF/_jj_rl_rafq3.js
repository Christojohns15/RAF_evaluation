/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
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
 * Description: This script is for sending parameters to an api and display the pdf link.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 03-July-2024: Created the initial build by JJ0353
 *
 *
 *
 **************/
define(['N/https', 'N/record', 'N/search', 'N/url'],
    /**
 * @param{https} https
 * @param{record} record
 * @param{search} search
 * @param{url} url
 */
    (https, record, search, url) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            try {
                let documentno = requestParams.docno;
                let recordLink = url.resolveRecord({
                    recordType: record.Type.customrecord_jj_studentrec,
                    custrecord_jj_transactionnumb: documentno,
                    isEditMode: false,
                });
                //let body = 'Akshaya Institute student details: <a href="' + recordLink + '">View details</a>';
                return recordLink;
            }
            catch (error) {
                log.debug("Error " + error);
            }
        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return { get, put, post, delete: doDelete }

    });
