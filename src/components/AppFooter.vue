<template>
  <footer class="app-footer">
    <Container>
      <ul class="footer-links">
        <li>
          <a href="https://www.ilovenft.com/shipping-policy"
            >​Shipping Policy</a
          >
        </li>
        <li>
          <a href="https://www.ilovenft.com/return-policy">Return Policy</a>
        </li>
        <li>
          <a href="https://www.ilovenft.com/store-policy">Terms of Service</a>
        </li>
        <li>
          <a href="https://www.ilovenft.com/privacy-policy">Privacy Policy</a>
        </li>
        <li>
          <a href="https://www.ilovenft.com/payment-method">Payment Method</a>
        </li>
      </ul>

      <div class="footer-bottom">
        <ul class="bottom-social-links">
          <li>
            <a
              href="https://discord.gg/SvzsUvywEW"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://static.wixstatic.com/media/718341_3a696d5edd334e639f3560474cd9c37f~mv2.png/v1/fill/w_32,h_32,al_c,q_85,enc_auto/718341_3a696d5edd334e639f3560474cd9c37f~mv2.png"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/ilovenft_xyz/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://static.wixstatic.com/media/718341_a1d562afe35c451897b6b940134fc303~mv2.png/v1/fill/w_32,h_32,al_c,q_85,enc_auto/718341_a1d562afe35c451897b6b940134fc303~mv2.png"
              />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/iLoveNFT_xyz"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://static.wixstatic.com/media/718341_6efe353f3b144dbc9f38a0d4a1bce9ba~mv2.png/v1/fill/w_32,h_32,al_c,q_85,enc_auto/718341_6efe353f3b144dbc9f38a0d4a1bce9ba~mv2.png"
              />
            </a>
          </li>
        </ul>

        <div class="bottom-copyright">&copy; {{ currentYear }} iLoveNFT .YESURPRISE CO., LIMITED </div>

        <div class="bottom-paypal">
          <img
            src="https://static.wixstatic.com/media/718341_68e8d5ce924845f8a70f6fe3eb460c4e~mv2.png/v1/fill/w_32,h_32,al_c,q_85,enc_auto/pay%20icon.png"
          />
        </div>
      </div>
    </Container>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import Container from "./Container.vue";

const currentYear = ref(new Date().getFullYear());
</script>

<style lang="less" scoped>
.app-footer {
  padding: 20px 0;
  margin-top: 20px;
}
.footer-links {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 50px auto;

  .bottom-social-links {
    display: flex;

    > li {
      + li {
        margin-left: 20px;
      }
    }
  }
}
</style>
