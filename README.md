# GreenBlender Code Challenge

Create a node module that accepts an array of customers and a directory path and results in the creation of shipping label PDFs for each customer.

The shipping label PDFs will be retrieved from one of our shipping partner's API (OnTrac). PDF files should be saved to the directory path argument and file names should match the following format.

`{{customerId}}-{{trackingNumber}}.pdf`

You can utilize whichever npm libraries you'd like but please use the `--save` flag when installing so we can install and run on our end.

Add your module to `index.js`. It should include a public method called `createLabels` and follow the spec below.

Once complete, remove the `node_modules` directory and the generated PDFs, zip up the entire app, and email us the zip.

We'll be looking for well structured code that works and is easy to understand and maintain.

Please send us an email if you have any questions.

## index.js

```
yourModule.createLabels(customersArray, directoryPath);
```
Name | Type | Description
:--- | :--- | :---
`customersArray` | `Array` | Array of customers. See `customers.js` below.
`directoryPath` | `String` | Path of directory to write PDFs to.
`callback` | `function` | Error-first callback with an array of PDF paths as the second argument.

**Callback Args**

Name | Type | Description
:--- | :--- | :---
`error` | `Object` | Error object.
`pdfPaths` | `Array` | Array of PDF file paths.


**We've included two files in the `lib` directory that will help complete this challenge.**

## customers.js

Module that contains an array of objects for 20 dummy customers.

*All customer data is fake and was generated using [Mockaroo](https://www.mockaroo.com/).*

## OnTracHelpers.js

Module containing an API URL and two helper functions for dealing with OnTrac's API.

### `OnTracHelpers.apiUrl`

Name | Type | Description
:--- | :--- | :---
`apiUrl` | `String` | OnTrac API URL for generating shipments.

*The provided API URL is specifically for development and testing. The tracking and label data returned from the API is dummy data and can not actually be used to send shipments.*

Option | Value
:--- | :---
URL | `OnTracHelpers.apiUrl`
Method | POST
Header | `Content-type: text/xml`
Data | Result from `OnTracHelpers.createShipObject()`


### `OnTracHelpers.createShipObject`

**Properties**

Name | Type | Description
:--- | :--- | :---
`customer` | `Object` | A single customer object.

**Returns**

XML string to be sent as a POST request to `OnTracHelpers.apiUrl`.


### `OnTracHelpers.getInfoFromResponse`
Converts XML response from OnTrac's API to a simplified result object containing three properties.

**Properties**

Name | Type | Description
:--- | :--- | :---
`responseBody` | `String` | The response body from the API request.
`callback` | `Function` | Error-first callback with result object as second argument.

**Result Object Example**

```
{
    error: '',
    tracking: '',
    label: ''
}
```

**Result Object Properties**

Name | Type | Description
:--- | :--- | :---
`error` | `String` | Any errors from OnTrac's API.
`tracking` | `String` | The tracking number for the customer's shipment.
`label` | `String` | PDF file as a base64 string.
