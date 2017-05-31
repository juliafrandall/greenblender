var jsontoxml = require('jsontoxml'),
    xmlToObject = require('xml2js').parseString;

module.exports = {

    /**
     * apiURL
     * @type {String}
     *
     * OnTrac API URL for generating shipments.
     *
     * This URL is specifically for development and testing.
     * The tracking and label data returned from the API is essientially dummy data.
     */
    apiUrl: 'https://www.shipontrac.net/OnTracTestWebServices/OnTracServices.svc/V2/37/shipments?pw=testpass',

    /**
     *  createShipObject
     *
     *  Creates a XML formatted shipping object
     *  that adhere to OnTrac's API spec
     *
     * @param  {Object}     customer    A customer object
     *
     * @return {String}                 XML string
     */
    createShipObject: function(customer) {

        var shipObject = {

            OnTracShipmentRequest: {
                Shipments: {
                    Shipment: {
                        UID: 'GB' + customer.id,
                        shipper: {
                            Name: 'GreenBlender',
                            Addr1: '3305 E. Vernon Avenue',
                            City: 'Vernon',
                            State: 'CA',
                            Zip: '90058',
                            Contact: 'John',
                            Phone: '1234567890'
                        },

                        consignee: {
                            Name: customer.first_name + ' ' + customer.last_name,
                            Addr1: customer.address_1,
                            Addr2: customer.address_2,
                            Addr3: '',
                            Phone: customer.phone,
                            City: customer.city,
                            State: customer.state,
                            Zip: customer.zipcode,
                            Contact: customer.is_residential ? customer.first_name + ' ' + customer.last_name : ''
                        },

                        Service: 'C',
                        SignatureRequired: false,
                        Residential: customer.is_residential,
                        Declared: 49,
                        Weight: 11.0,
                        Instructions: customer.delivery_notes || '',
                        Reference: customer.id,
                        DIM: {
                            Length: 12.0,
                            Width: 10.0,
                            Height: 8.0
                        },
                        LabelType: 1,
                        DelEmail: customer.email,
                        ShipDate: '2017-12-30',
                        Tracking: '',
                        BillTo: 0,
                        Reference2: customer.delivery_notes || '',
                        Reference3: '',
                        CODType: 'NONE',
                        COD: 0.0,
                        ShipEmail: '',
                        SaturdayDel: false,
                    }
                }
            }

        };

        shipObject = jsontoxml(shipObject);

        return shipObject;

    },


    /**
     *  getInfoFromResponse
     *
     *  Convert XML response from OnTrac's API to a simplified
     *  JavaScript object using node-xml2js.parseString
     *
     * @param  {String}     responseBody     Response body from OnTrac's API request
     * @param  {Function}   callback         Error first callback with result object as second argument
     */
    getInfoFromResponse: function(responseBody, callback) {

        xmlToObject(responseBody, function(error, object) {

            var response = {
                error: object.error || object.OnTracShipmentResponse.Shipments[0].error,
                tracking: object.OnTracShipmentResponse.Shipments[0].Shipment[0].Tracking[0],
                label: object.OnTracShipmentResponse.Shipments[0].Shipment[0].Label[0]
            };
            // console.log(response, "this is the respons")
            callback(error, response);

        });

    }

};
