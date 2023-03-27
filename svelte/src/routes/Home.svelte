<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import { paginate, PaginationNav } from 'svelte-paginate'
  import Hero from "../components/Hero.svelte";
  import Article from "../components/Article.svelte";
  import { directus } from "../services/directus";
  import { formatRelativeTime } from "../../../shared/utils/format-relative-time";

  let hero, articles;
  export let members = false
  let currentPage = 1
  let pageSize = 3
  
  async function fetchData() {
    const response = await directus.items("articles").readByQuery({
      fields: ["*", "author.avatar", "author.first_name", "author.last_name", "fred"],
      filter: {
        membersOnly: members,
      },
      // @ts-ignore
      sort: "-publish_date",
    });

    const formattedArticles = response.data.map((fred) => {
      return {
        ...fred,
        // @ts-ignore
        publish_date: formatRelativeTime(new Date(fred.publish_date)),
      };
    });

    const [first, ...rest] = formattedArticles;
    hero = first;
    articles = rest;
  }

  onMount(fetchData);
  $: paginatedItems = articles && paginate({ items: articles, pageSize, currentPage })

</script>

<style>
  div.a {
    text-align: center;
  }
</style>

<main>
  <section class="main-content">
    <div class="container">
      {#if hero}
        <Hero article={hero} />
      {/if}
      {#if articles}
        <div class="articles-grid">
          {#each paginatedItems  as article, index}
            <Article {article} bordered={index !== articles.length - 1} />
          {/each}
        </div>
      {/if}
    </div>

    <div class = "a">
      {#if articles}
      <PaginationNav
          totalItems="{articles.length}"
          pageSize="{pageSize}"
          currentPage="{currentPage}"
          limit="{1}"
          showStepOptions="{true}"
          on:setPage="{(e) => currentPage = e.detail.page}"
      /> 
      {/if}
    </div>
  </section>
</main>
