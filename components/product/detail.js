import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import { addProductToOrder, recommendProduct, likeProduct, unLikeProduct } from "../../data/products"
import Modal from "../modal"
import { Input } from "../form-elements"
import { useAppContext } from "../../context/state"
import { getUserProfile } from "../../data/auth"

export function Detail({ product }) {
  const { profile, setProfile } = useAppContext()
  const router = useRouter()
  const usernameEl = useRef()
  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [ isLiked, setIsLiked] = useState(false)

  const addToCart = () => {
    addProductToOrder(product.id).then(() => {
      router.push('/cart')
    })
  }

  const recommendProductEvent = () => {
    recommendProduct(product.id, usernameEl.current.value).then((res) => {
      if (res) {
        setShowError(true)
      } else {
        setShowModal(false)
        setShowError(false)
        usernameEl.current.value = ""
      }
    })
  }

  const like = () => {
    likeProduct(product.id).then(() => {
      setIsLiked(true); 
    });
  };

  const unlike = () => {
    unLikeProduct(product.id).then(() => {
      setIsLiked(false); 
    });
  };

  useEffect(() => {
    const likedProduct = profile.liked_products?.find(x => x.product.id === product.id);
    
    if (likedProduct !== undefined) {
    setIsLiked(true);  
    }
    
  }, [profile.liked_products, product.id]);

   useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData)
      }
    })
  }, [isLiked])

  return (
    <>
      <Modal setShowModal={setShowModal} showModal={showModal} title="Recommend this product to a user">
        <Input id="username" label="Enter a username" refEl={usernameEl}>
          {
            showError ? <p className="help is-danger">This user doesn't exist</p> : <></>
          }
        </Input>
        <>
          <button className="button is-success" onClick={recommendProductEvent}>Recommend Product</button>
          <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
        </>
      </Modal>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/640x480.png"></img>
            </figure>
          </article>
        </div>
        <div className="tile is-parent is-vertical ">
          <article className="tile is-child">
            <h1 className="title">{product.name} - ${product.price}</h1>
            <p className="subtitle">{product.store?.name}</p>
            <p>{product.description}</p>
            <p>Pick up available in: {product.location}</p>
          </article>
          <article className="tile is-child is-align-self-center">
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary" onClick={addToCart}>Add to Cart</button>
              </p>
              <p className="control">
                <button
                  className="button is-danger is-outlined"
                  onClick={() => setShowModal(true)}
                >Recommend this Product</button>
              </p>
              <p className="control">
                {
                  isLiked ?
                    <button className="button is-link is-outlined" onClick={unlike}>
                      <span className="icon is-small">
                        <i className="fas fa-heart-broken"></i>
                      </span>
                      <span>Unlike Product</span>
                    </button>
                    :
                    <button className="button is-link is-outlined" onClick={like}>
                      <span className="icon is-small">
                        <i className="fas fa-heart"></i>
                      </span>
                      <span>Like Product</span>
                    </button>
                }
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
