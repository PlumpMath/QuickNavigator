dataProviderModule.service("mostRecentUseProvider", function ($cfg) {
    async:false,

    this.init = function(){ }

    this.query = function(txt,asyncFunc){
        var urls = db.getVisitedURLs();
        urls.sort(function(a,b){
            return b.visitedCount - a.visitedCount; 
        });
        var mruLists = [];

        var maxMRUCount = $cfg.getMRUCount();
        urls = urls.slice(0,maxMRUCount);
        urls.forEach(function(element,n,arrary){
            mruLists.push({title:element.title,url:element.url,providerName:"mostRecentUseProvider",relevancy:element.visitedCount}); 
        });

        if(typeof txt === "undefined" || txt === "") return mruLists;
        return mruLists.find(txt); 
    };
});
