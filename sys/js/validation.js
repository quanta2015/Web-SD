$.validator.setDefaults({
  errorClass: "help-block help-block-error",
  highlight: (e) => { $(e).closest(".form-group").addClass("has-error") },
  unhighlight: (e) => { $(e).closest(".form-group").removeClass("has-error") },
  success: (e) => { e.closest(".form-group").removeClass("has-error") },
});
