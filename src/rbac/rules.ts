const rules = {
    juvo: {
        static: [
            'view:user-management',
            'view:customer-support'
        ],
    },
    admin: {
        static: [
            'view:user-management',
            'view:customer-support'
        ],
    },
    customerSupport: {
        static: [
            'view:customer-support'
        ],
    },
};

export default rules
