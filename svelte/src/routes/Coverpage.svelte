<script>
    import { getAssetURL } from "../utils/get-asset-url";





</script>

<style>
.text-block {
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 40%;
  background-color: black;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 50px;
  padding-bottom: 50px;
 
}

.column {
  float: left;
  width: 50%;
  padding: 50px;
}

@media screen and (max-width: 768px) {
  .column {
  float: left;
  width: 100%;
  padding: 50px;
}
}


/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

ul.no-bullets {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

</style>

<!-- so the text is absolute position and the container holding the image is relative -->

<main>
    <section class="main-content">
      <div class="container" style="position:relative">
        <img src={getAssetURL("df16fd9f-4250-42f8-ba7a-c5f9b6d932d9")} alt="Chateau Ketley" style="width:100%;" >
        <div class="text-block">
          <p>The Wolfsberg Group is an association of thirteen global banks 
            which aims to develop frameworks and guidance for the management of financial crime risks. </p>
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="column" >
          <h2>GLOBAL BANKS: <br>GLOBAL STANDARDS</h2>

            <ul class="no-bullets">
              <li>Banco Santander</li>
              <li>Bank of America</li>
              <li>Barclays</li>
              <li>Citigroup</li>
              <li>Deutsche Bank</li>
              <li>Goldman Sachs</li>
              <li>HSBC</li>
              <li>J.P. Morgan Chase</li>
              <li>MUFG Bank</li>
              <li>Norricorp Ltd</li>
              <li>Société Générale</li>
              <li>Standard Chartered Bank</li>
              <li>UBS</li>
            </ul>
        </div>

        <div class="column" >
          <p>The Wolfsberg Group is an association of thirteen global banks which aims to develop frameworks 
          and guidance for the management of financial crime risks, particularly with respect to Know Your 
          Customer, Anti-Money Laundering and Counter Terrorist Financing policies.
          </p>
          <p>
          The Group came together in 2000, at the Château Ketley in north-eastern Switzerland, 
          in the company of representatives from Transparency International, including Stanley Morris, 
          and Professor Mark Pieth of the University of Basel, to work on drafting anti-money laundering guidelines for Private Banking. The Wolfsberg Anti-Money Laundering (AML) Principles for Private Banking were subsequently published in October 2000, revised in May 2002 and again most recently in June 2012.
          </p>
        </div>
      </div>  
    </section>
  </main>