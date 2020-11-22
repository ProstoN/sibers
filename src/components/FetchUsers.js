/*
We make a request to http://demo.sibers.com/users and save the resulting result in localStorage.
Next, we update the page to pull up the entries made to localStorage
*/
export const fetchUsers = () => {
    if (JSON.parse(localStorage.getItem('users') || 'null') === null) {
        fetch('http://demo.sibers.com/users')
            .then((res) => res.json())
            .then(
                (result) => {
                    localStorage.setItem('users', JSON.stringify(result));
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                },
            );
    }
};
