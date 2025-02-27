let createFilterStatus = (currentStatus, ItemsModel) => {
    let statusFilter = [
        {name: 'All', value: 'all', count: 1, link: '#', class: 'default'},
        {name: 'ACTIVE', value: 'active', count: 2, link: '#', class: 'default'},
        {name: 'INACTIVE', value: 'inactive', count: 3, link: '#', class: 'default'}
    ];

    statusFilter.forEach((item, index) =>{
        let condition = {};
        if(item.value !== "all") condition = {status: item.value};
        ItemsModel.countDocuments(condition)
        .then(data => {
            statusFilter[index].count = data;
        });
        if(item.value === currentStatus) statusFilter[index].class = 'success';
    })
    return statusFilter;
}

module.exports = {
    createFilterStatus: createFilterStatus,
}