const {origin, pathname, hash = ''} = new URL(window.location.href);
if (hash.length) {
  window.location.href = `${origin}${pathname}?${hash.substring(1)}&callback=true`;
} else {
  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
}
