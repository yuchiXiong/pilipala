import request from '../../../editor_for_react/utils/request';

const index = (params) => {

    const orderWayAlias = {
        descend: 'desc',
        ascend: 'asc'
    };

    return request.get(
        '/admin/blogs'
        + '?page=' + (params.pagination.current || 1)
        + '&size=' + (params.pagination.pageSize || 10)
        + '&by=' + (params.sortField || 'id')
        + '&order=' + (orderWayAlias[params.sortOrder] || 'desc')
    )
};

const show = () => {
};

const create = () => {
};

const update = () => {
};

const destroy = () => {
};

export {
    index,
    show,
    create,
    update,
    destroy
};