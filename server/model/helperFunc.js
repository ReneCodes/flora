const dateString = () => {
	return new Date().toLocaleDateString(undefined, {month: 'short', day: '2-digit', year: 'numeric'});
};

module.exports = {
	dateString,
};
