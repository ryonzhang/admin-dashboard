const userNotSelf = ({ selfId, userId }:{selfId?:string,userId?:string}) => {
    if (!userId || !selfId) return false;
    return userId !== selfId
};

const rules = {
    juvo: {
        static: [
            'view:user-management',
            'view:customer-support',
            'assign:juvo-role'
        ],
        dynamic: {
            'delete:users': userNotSelf,
        }
    },
    admin: {
        static: [
            'view:user-management',
            'view:customer-support'
        ],
        dynamic: {
            'delete:users': userNotSelf,
        }
    },
    customerSupport: {
        static: [
            'view:customer-support'
        ],
    },
};

export default rules
