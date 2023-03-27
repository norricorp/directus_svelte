<script>
  import GithubIcon from "./icons/Github.svelte";
  import YoutubeIcon from "./icons/Youtube.svelte";
  import LinkedinIcon from "./icons/Linkedin.svelte";
  import TwitterIcon from "./icons/Twitter.svelte";

  const currentYear = new Date().getFullYear();
</script>

<footer>
<!--   <div class="container footer__topWrapper">
    <span>
      Generated with <span class="underline">Svelte</span>, powered by
      <span class="underline">Directus</span>.
    </span>
  </div> -->
  <div class="container footer__bottomWrapper">
    <span class="footer__copyright">
      © {currentYear} Norricorp Ltd
    </span>
    <ul class="footer__socials">
      <li>
        <a
          href="https://github.com/norricorp"
          class="logo"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GithubIcon />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/c/DirectusVideos"
          class="logo"
          target="_blank"
          rel="noreferrer noopener"
        >
          <YoutubeIcon />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/john-norris-2325b916/"
          class="logo"
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedinIcon />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/directus"
          class="logo"
          target="_blank"
          rel="noreferrer noopener"
        >
          <TwitterIcon />
        </a>
      </li>
    </ul>
  </div>
</footer>
