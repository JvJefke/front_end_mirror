(function () {
    angular.module('mirrorApp').factory('tempConfLib', [function () {


        return [
            {
                "ID": 1,
                "isActive": true,
                "MeberID": 1,
                "MemberName": "Member1",
                "Apps": [
                    {
                        "ID": 1,
                        "ConfigID": 1,
                        "Data": JSON.stringify({ "TimeZone": "TOBEADDED" }),
                        "isActive": true,
                        "Name": "time",
                        "pTop": "0px",
                        "pLeft": "0px"
                    }, {
                        "ID": 2,
                        "ConfigID": 2,
                        "Data": JSON.stringify({ "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4" }),
                        "Name": "calendar",
                        "isActive": true,
                        "pTop": "0px",
                        "pLeft": "1440px"
                        /*"pLeft":"1000px"*/
                    }, {
                        "ID": 3,
                        "ConfigID": 3,
                        "Data": JSON.stringify({ "Location": "Kortrijk,be" }),
                        "isActive": true,
                        "Name": "weather",
                        "pTop": "318px",
                        "pLeft": "0px"
                    }, {
                        "ID": 4,
                        "ConfigID": 4,
                        "Data": JSON.stringify({ "URL": "http://feeds.nieuwsblad.be/nieuws/snelnieuws?format=xml" }),
                        "isActive": true,
                        "Name": "news",
                        "pTop": "689px",
                        "pLeft": "1440px"
                        /*"pLeft": "500px",
                        "pTop": "400px"*/
                    }, {
                        "ID": 5,
                        "ConfigID": 5,
                        "Data": JSON.stringify({ "text": "Welcome to the future of IT" }),
                        "isActive": true,
                        "Name": "compliment",
                        "pLeft": "562px",
                        "pTop": "515px"
                    }, {
                        "ID": 500,
                        "ConfigID": 500,
                        "Data": JSON.stringify({ "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"] }),
                        "isActive": true,
                        "Name": "reminders",
                        "pTop": "950px",
                        "pLeft": "684px"
                    }, {
                        "ID": 222,
                        "ConfigID": 222,
                        "Data": JSON.stringify(null),
                        "isActive": true,
                        "Name": "timer",
                        "pTop": "53px",
                        "pLeft": "836px"
                    }, {
                        "ID": 444,
                        "ConfigID": 444,
                        "Data": JSON.stringify(null),
                        "isActive": true,
                        "Name": "qod",
                        "pTop": "918px",
                        "pLeft": "0px",
                    }
                ]
            },
            {
                "ID": 2,
                "isActive": true,
                "MeberID": 2,
                "MemberName": "Member2",
                "Apps": [
                    {
                        "ID": 1,
                        "ConfigID": 1,
                        "Data": JSON.stringify({ "TimeZone": "TOBEADDED" }),
                        "isActive": true,
                        "Name": "time",
                        "pTop": "0px",
                        "pLeft": "0px"
                    }, {
                        "ID": 2,
                        "ConfigID": 2,
                        "Data": JSON.stringify({ "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4" }),
                        "Name": "calendar",
                        "isActive": true,
                        "pTop": "0px",
                        "pLeft": "1440px"
                    }, {
                        "ID": 3,
                        "ConfigID": 3,
                        "Data": JSON.stringify({ "Location": "Kortrijk,be" }),
                        "isActive": true,
                        "Name": "weather",
                        "pTop": "318px",
                        "pLeft": "0px"
                    }, {
                        "ID": 4,
                        "ConfigID": 4,
                        "Data": JSON.stringify({ "URL": "http://www.hln.be/rss.xml" }),
                        "isActive": true,
                        "Name": "news",
                        "pTop": "689px",
                        "pLeft": "1440px"
                    }, {
                        "ID": 5,
                        "ConfigID": 5,
                        "Data": JSON.stringify({ "text": "Welcome to the future of IT" }),
                        "isActive": true,
                        "Name": "compliment",
                        "pLeft": "562px",
                        "pTop": "515px"
                    }, {
                        "ID": 500,
                        "ConfigID": 500,
                        "Data": JSON.stringify({ "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"] }),
                        "isActive": true,
                        "Name": "reminders",
                        "pTop": "950px",
                        "pLeft": "684px"
                    }, {
                        "ID": 222,
                        "ConfigID": 222,
                        "Data": JSON.stringify(null),
                        "isActive": true,
                        "Name": "timer",
                        "pTop": "53px",
                        "pLeft": "0px"
                    }, {
                        "ID": 333,
                        "ConfigID": 333,
                        "Data": JSON.stringify({ "from": "Graaf Karel de Goedelaan 38, Kortrijk", "to": "Kontich, veldkant 33A" }),
                        "isActive": true,
                        "Name": "traffic",
                        "pTop": "864px",
                        "pLeft": "0px"
                    }
                ]
            }
        ];




        /*return [
                {
                    "ID": 0,
                    "isActive": true,
                    "MeberID": "Member1",
                    "MemberName": "Member1",
                    "Time":
                        {
                            "ID": 1,
                            "TimeZone": "TOBEADDED",
                            "pTop": "10px",
                            "pLeft": "45px"
                        },
                    "Calendar":
                        {
                            "ID": 1,
                            "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4",
                            "pTop": "30px",
                            "pLeft": "1440px"
                        },
                    "Weather":
                        {
                            "ID": 1,
                            "Location": "Kortrijk,be",
                            "pTop": "300px",
                            "pLeft": "10px"
                        },
                    "News":
                        {
                            "ID": 1,
                            "URL": "http://www.hln.be/rss.xml",
                            "pTop": "650px",
                            "pLeft": "1440px"
                        },
                    "compliment":
                        {
                            "ID": 3,
                            "text": "Welcome to the future of IT",
                            "pLeft": "0px",
                            "pTop": "515px"
                        },
                    "reminders":
                        {
                            "ID": 500,
                            "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"],
                            "pTop": "950px",
                            "pLeft": "0px"
                        },
                    "timer":
                        {
                            "ID": 222,
                            "pTop": "50px",
                            "pLeft": "0px"
                        },
                    "qod":
                        {
                            "ID": 444,
                            "pTop": "910px",
                            "pLeft": "10px",
                        }
    
                },
                {
                    "ID": 0,
                    "UserID": 0,
                    "Time":
                        {
                            "ID": 1,
                            "TimeZone": "TOBEADDED",
                            "pTop": "10px",
                            "pLeft": "45px"
                        },
                    "Calendar":
                        {
                            "ID": 1,
                            "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4",
                            "pTop": "30px",
                            "pLeft": "1440px"
                        },
                    "Weather":
                        {
                            "ID": 1,
                            "Location": "Kortrijk,be",
                            "pTop": "300px",
                            "pLeft": "10px"
                        },
                    "News":
                        {
                            "ID": 1,
                            "URL": "http://www.hln.be/rss.xml",
                            "pTop": "450px",
                            "pLeft": "1440px"
                        },
                    "compliment":
                        {
                            "ID": 3,
                            "text": "Changing your reflection",
                            "pLeft": "0px",
                            "pTop": "515px"
                        },
                    "reminders":
                        {
                            "ID": 500,
                            "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"],
                            "pTop": "950px",
                            "pLeft": "0px"
                        },
                    "timer":
                        {
                            "ID": 222,
                            "pTop": "50px",
                            "pLeft": "0px"
                        },
                    "traffic":
                        {
                            "ID": 333,
                            "pTop": "150px",
                            "pLeft": "350px"
                        }
                },
                {
                    "ID": 0,
                    "UserID": 0,
                    "Time":
                        {
                            "ID": 1,
                            "TimeZone": "TOBEADDED",
                            "pTop": "10px",
                            "pLeft": "45px"
                        },
                    "Calendar":
                        {
                            "ID": 1,
                            "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4",
                            "pTop": "30px",
                            "pLeft": "1440px"
                        },
                    "Weather":
                        {
                            "ID": 1,
                            "Location": "Kortrijk,be",
                            "pTop": "600px",
                            "pLeft": "10px"
                        },
                    "News":
                        {
                            "ID": 1,
                            "URL": "http://www.hln.be/rss.xml",
                            "pTop": "650px",
                            "pLeft": "1440px"
                        },
                    "compliment":
                        {
                            "ID": 3,
                            "text": "Changing your reflection",
                            "pLeft": "0px",
                            "pTop": "515px"
                        },
                    "reminders":
                        {
                            "ID": 500,
                            "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"],
                            "pTop": "950px",
                            "pLeft": "0px"
                        },
                    "timer":
                        {
                            "ID": 222,
                            "pTop": "50px",
                            "pLeft": "0px"
                        }
                }
        ];*/
    }]);
})();