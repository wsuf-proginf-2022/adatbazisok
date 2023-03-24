

# json-generator.com

example:

```javascript
[
  '{{repeat(150)}}',
  {
   "id": "{{integer(1, 1000)}}",   
   "url": "http://www.example.com/shows/{{integer(1, 1000)}}",
   "name": "{{lorem(1, 'sentence')}}",
   "type": "{{random('Scripted', 'Reality', 'News', 'Comedy')}}",
   "language": "{{random('English', 'German', 'French', 'Spanish')}}",    
   "genres":
        function() {
          var d=["Drama", "Comedy", "Action", "Reality TV", "Thriller", "Science-Fiction", "Fantasy"],
           n=Math.floor(Math.random() * 7) + 1; var s= new Set();
            for(var i=0;i<n;i++) {
                var index = Math.floor(Math.random() * 7);
                s.add(d[index]);
            }
          return Array.from(s);
         },                    
   "reviews": [  
     '{{repeat(1,3)}}',
     {
       "author": "{{firstName()}} {{surname()}}",
       "comment": "{{lorem(1, 'sentence')}}",
       "rating": "{{floating(5, 10, 1)}}",
       "recommendation": "{{random('no', 'yes', 'maybe', 'uncertain')}}"
     }
   ],
    "status": "{{random('Ended', 'Ongoing')}}",
    "runtime": "{{integer(30, 120)}}",
    "premiered": "{{date(new Date(2010, 0, 1), new Date(), 'YYYY-MM-dd')}}",
    "officialSite": "http://www.example.com",
    "schedule": {
      "time": "{{integer(0, 23)}}:{{integer(0, 59)}}",
      "days":
        function() {
          var d=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
           n=Math.floor(Math.random() * 7) + 1; var s= new Set();
            for(var i=0;i<n;i++) {
                var index = Math.floor(Math.random() * 7);
                s.add(d[index]);
            }
          return Array.from(s);  
         }                    

    },
    "rating": {
      "average": "{{floating(0, 10, 1)}}"
    },
    "weight": "{{integer(1, 100)}}",
    "network": {
      "id": "{{integer(1, 100)}}",
      "name": "{{random('HBO', 'Netflix', 'RTL', 'Hulu')}}",
      "country": {
        "name": "{{random('United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Canada')}}",
        "code": "{{random('US', 'UK', 'DE', 'FR', 'ES', 'CA')}}",
        "timezone": "{{random('America/New_York', 'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Europe/Madrid', 'America/Toronto')}}"
      }
    },
    "webChannel": null,
    "externals": {
      "tvrage": "{{integer(10000, 99999)}}",
      "thetvdb": "{{integer(100000, 999999)}}",
      "imdb": "tt{{integer(1000000, 9999999)}}"
    },
    "image": {
      "medium": "http://www.example.com/images/{{integer(1, 1000)}}-medium.jpg",
      "original": "http://www.example.com/images/{{integer(1, 1000)}}-original.jpg"
    },
    "summary": "{{lorem(3, 'paragraphs')}}",
    "updated": "{{date(new Date(new Date().getFullYear() - 1, 0, 1), new Date(), 'YYYY-MM-dd')}}",
    "_links": {
      "self": {
        "href": "http://www.example.com/shows/{{integer(1, 1000)}}"
      },
      "previousepisode": {
        "href": "http://www.example.com/shows/{{integer(1, 1000)}}/episodes/{{integer(1, 10)}}"
      }
    }
  }
]
```
