

function createPages(API, totalResources, retrievedItems)
{
    if(totalResources === retrievedItems)
    {

        return [];
    }
    const pages = [];
    const totalPages = Math.floor(totalResources / retrievedItems)  + 1;

    let pageNumber = 1;
    for(pageNumber = 1; pageNumber <= totalPages; pageNumber++)
    {
        pages.push(`${API}?page=${pageNumber}`)
    }
    return pages;
}



function calcPages(result, API) {

    const  { results, count } = result
    return createPages(API, count, results.length)
}

function makeCallsforAllPages(pages)
{
    return Promise.all(pages.map(page => fetch(page)))
}

function jsonifypages(allpromises)
{
    return Promise.all(allpromises.map(res => res.json()))
}
function concat(data)
{
    return [].concat.apply([], data)
}

function extractResults(data) {
    return data.map(value => value.results)
}
function extractName(data)
{
    return  data.map(res => { return { name : res.name, url: res.url};
    })
}

function loadData(API, setStore, reject)
{
    fetch(API)
        .then(response => response.json())
        .then(firstPageResponse => calcPages(firstPageResponse, API))
        .then(makeCallsforAllPages)
        .then(jsonifypages)
        .then(extractResults)
        .then(concat)
        .then(extractName)
        .then(names => names.sort() )
        .then(setStore).catch(reject);
}

export {loadData } ;