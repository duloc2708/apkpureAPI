const getContextAPI = (listAPI, controllers) => {
    let listData = []
    listAPI.map(item => {
        const { api, action } = item
        listData.push({
            path: api,
            context: {
                controller: controllers,
                action: action
            }
        })
    })
    return listData
}
module.exports = {
    getContextAPI
}