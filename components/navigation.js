import Link from 'next/link'
import styles from './nav.module.css'
import { signin, signout, useSession } from 'next-auth/client';


function Navigation() {
  console.log();

  const [session, loading] = useSession();

  return (
    <header>
    <nav>
      <p>
      <Link href="/">
        <a className={styles.link}> Main Page</a>
      </Link>
      <Link href="/about">
        <a> About Me</a>
      </Link>
      </p>


      <p>
        {!session && (
          <>
          <a href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signin('spotify');
          }}
          >
            <button className={"signInButton"}>Sign In with Spotify</button>
          </a>
            <a href="/api/auth/signin"
               onClick={(e) => {
                 e.preventDefault();
                 signin('twitter' );
               }}
            >
              <button className={"signInButton"}>Sign In with Twitter</button>
            </a>

          </>
        )}
        {session && (
          <>
          <Link href={"/about"}>
            <a>
              <span
                style={{ backgroundImage: `url( ${session.user.image})` }}
                className={"avatar"}
            />
            </a>
          </Link>
          <span className="email">{session.user.email}</span>
          <a
            href="/api/auth/signout"
            onClick={(e) => {
              e.preventDefault();
              signout();
            }}
          >
            <button className={"signOutButton"}>Sign out</button>
          </a>
          </>
        )}
      </p>
    </nav>


      <style jsx>{`

        header {
        border-bottom: 1px solid #ccc;
        }

        nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 120rem;
        padding: 0.2rem 1.25rem;
        margin: 0 6% 0 0;
        }

        p {
        display: flex;
        gap: 40px;
        }

        .signInButton{
        background-color: #1eb1fc;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        }

        .signInButton:hover {
          background-color: #1b9fe2;
        }

        .signOutButton {
          background-color: #333;
        }

        .signOutButton {
          background-color: #555;
        }


      `}</style>
    </header>
  )
}

export default Navigation
