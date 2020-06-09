export const generateCsv = (rowData) => {
    const data = [];
    rowData.forEach((ob, index, arr) => {

        var wSitePlacement = ob.website ? ob.website : "" + ob.placement.replace(/,/g, ';');
        const temp = [ob.unit, ob.unit, ob.sizes, ",", wSitePlacement.trim(), "_blank,"];
        data.push(temp);
    });

    var csv = '';
    data.forEach(function (row) {
        csv += row.join(',');
        csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:application/octet-stream,' + encodeURIComponent(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'BulkUnits.csv';
    hiddenElement.click();
}