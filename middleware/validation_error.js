module.exports = (req, err) => {

    const validation = Object.keys(err.errors).map(key => err.errors[key].message);
    req.flash('validationErrors', validation );

    return validation;
} 