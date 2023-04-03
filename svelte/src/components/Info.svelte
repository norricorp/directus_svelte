<script>
  import { onMount } from "svelte";
  import { getAssetURL } from "../utils/get-asset-url";
  import { Link } from "svelte-navigator";
  import Time, { svelteTime } from "svelte-time";
	import { dayjs } from "svelte-time";
  import { directus } from "../services/directus";
 
  let first, second;
  export let infoMembers = false
   
  async function fetchData() {
    const response = await directus.items("articles").readByQuery({
      fields: ["*", "fred"],
      filter: {
        membersOnly: infoMembers,
      },
      limit: 2,
      // @ts-ignore
      sort: "-publish_date",
    });

    const formattedArticles = response.data.map((article) => {
      return {
        ...article,
      };
    });

    [first, second] = formattedArticles;
     
  }

  onMount(fetchData);

</script>

<style>
  .text-block {
    position: absolute;
    width: 45%;
    /* background-color: black; */
    /* background: rgba(255, 255, 255, 0.4); */
    background:  white;
    color: black;
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 30px;
    padding-bottom: 30px;
   
  }
  
  
</style>


<div style="position:relative">
  <img src={getAssetURL("1c5fe956-70d3-4fc6-a210-65aeb69873b6")} alt="news-background" style="width:100%;height: 400px;" >
  <div class="text-block" style="bottom: 100px; left: 20px;">
    {#if first}
    <p>
       <time
          use:svelteTime="{{
          timestamp: first.publish_date,
        }}"
      />
      <br>
      <Link to={`/articles/${first.id}`}>{first.title}</Link>
      <br>
      {first.excerpt}
     </p>
    {/if}
  </div>
  
    <div class="text-block" style="bottom: 100px; right: 20px;">
    {#if second}
    <p>
      <time
          use:svelteTime="{{
          timestamp: second.publish_date,
        }}"
      />
      <br>
      <Link to={`/articles/${second.id}`}>{second.title}</Link>
      <br>
      {second.excerpt}
     </p>
    {/if}
  </div>
</div>



