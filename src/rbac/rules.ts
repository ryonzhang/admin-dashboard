const userNotSelf = ({ selfId, userId }:{selfId?:string,userId?:string}) => {
    console.log(selfId);
    console.log(userId);
    if (!userId || !selfId) return false;
    return userId !== selfId;
};

const rules = {
    juvo: {
        static: [
            'view:user-management',
            'view:customer-support',
            'assign:juvo-role',
            'view:juvo-role',
        ],
        dynamic: {
            'delete:users': userNotSelf,
            'edit:user-email': userNotSelf,
            'edit:user-role': userNotSelf,
        }
    },
    admin: {
        static: [
            'view:user-management',
            'view:customer-support',
        ],
        dynamic: {
            'delete:users': userNotSelf,
            'edit:user-email': userNotSelf,
            'edit:user-role': userNotSelf,
        }
    },
    customerSupport: {
        static: [
            'view:customer-support'
        ],
    },
};

export default rules;
