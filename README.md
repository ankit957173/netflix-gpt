bug fixes of login logout browse by putting useEffect in header
as if i logout and then login then header may render code multiple times so at the unmount we should handle this by return a cleanaup function as we seen in setTimeout.
