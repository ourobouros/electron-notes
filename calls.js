function callAPI() {
    var AlchemyAPI = require('alchemy-api');
    var alchemy = new AlchemyAPI('5e0a4198d583aabe8a39557d240670120974a254');
    var Client = require('node-wolfram');
    var Wolfram = new Client('WGTR76-VGTY7HUV2X');
    alchemy.keywords('Glucose is comprised of 6 carbons, 12 hydrogens, and 6 oxygens.', {}, function (err, response) {
        if (err) throw err;

        // See http://www.alchemyapi.com/api/keyword/htmlc.html for format of returned object
        var keywords = response.keywords;
        console.log(keywords[1].text);
        for (var idx = 0; idx < keywords.length; idx++) {
            var qu = keywords[idx].text;
            Wolfram.query(qu, function (err, result) {
                if (err)
                    console.log(err);
                else {
                    for (var a = 0; a < result.queryresult.pod.length; a++) {
                        var pod = result.queryresult.pod[a];
                        console.log(pod.$.title, ": ");
                        for (var b = 0; b < pod.subpod.length; b++) {
                            var subpod = pod.subpod[b];
                            for (var c = 0; c < subpod.plaintext.length; c++) {
                                var text = subpod.plaintext[c];
                                console.log('\t', text);
                            }
                        }
                    }
                }
            });
        }
        // Do something with data
    });
}