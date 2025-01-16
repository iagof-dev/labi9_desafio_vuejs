<script>

import API from '../helpers/api.ts';

export default {
    async mounted() {
        let api = new API();
        await api.accountLogout();
        window.location.href = '/';
    }
};
</script>