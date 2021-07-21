import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Home({ res }) {
  return (
    <Layout page={"Crypto Watch - Accueil"}>
      <ul className="flex justify-around p-10">
        {res.map((crypto, index) => (
          <li
            key={index}
            className="relative hover:shadow-md p-8 border border-blue-300 rounded-3xl bg-blue-100 md:w-auto flex-1 mx-5"
          >
            <Link href={`/${crypto.id}`}>
              <a className="rounded-md">
                <div className="text-center">
                  <img
                    src={crypto.logo_url}
                    alt={crypto.name}
                    className="w-20 h-20 mx-auto mb-6"
                  />
                </div>
                <h2 className="text-2xl mb-6 upercase tracking-wider">
                  {crypto.name}
                </h2>
                <h3 className="font-bold text-2xl mb-4">
                  {parseFloat(crypto.price).toFixed(2)} USD
                </h3>
                <p>
                  1 jour :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["1d"].price_change_pct * 100).toFixed(
                      2,
                    ) + "%"}
                  </span>
                  {crypto["1d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>

                <p>
                  1 mois :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["30d"].price_change_pct * 100).toFixed(
                      2,
                    ) + "%"}
                  </span>
                  {crypto["30d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>

                <p>
                  1 an :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["365d"].price_change_pct * 100).toFixed(
                      2,
                    ) + "%"}
                  </span>
                  {crypto["365d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// server side rendered / avoir un rendu côté serveur
export async function getStaticProps(context) {
  try {
    const res = await fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=7850fe97ada75995b8733ed5eee827f81db6029e&ids=BTC,ETH,AAVE&interval=1d,30d,365d",
    ).then(res => res.json());

    return {
      // on retourne la requête en props
      props: { res },
    };
  } catch (err) {
    console.error(err);
  }
}
