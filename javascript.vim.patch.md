Find your `javascript.vim`.

`find /usr/local -name javascript.vim`

Feed the patch to `patch`. `patch` won’t find `javascript.vim` and will ask you
where it is.

`patch < javascript.vim.patch`

Give `patch` an absolute path to `javascript.vim`.

`patch` will ask you if you meant to reverse the patch. Yes, you did.
