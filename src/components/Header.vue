<template>
    <header :class="$style.header">
        <div :class="$style.logoBlock">
            <img src="@/assets/imgs/eagle.png" alt="Eagle" />
            <span :class="$style.logoTitle">The United States Presidential Inaugural Address</span>
        </div>
      <nav :class="$style.nav">
        <router-link :class="$style.link" :activeClass="$style.activeLink" to="/">Introduction</router-link>
        <router-link :class="$style.link" :activeClass="$style.activeLink" to="/explore/content">Explore Content</router-link>
        <router-link :class="$style.link" :activeClass="$style.activeLink" to="/explore/form">Explore Form</router-link>
        <router-link :class="$style.link" :activeClass="$style.activeLink" to="/speeches">Speeches</router-link>
      </nav>
    </header>
</template>
<script>
export default {
    data() {
        return {
            publicPath: process.env.BASE_URL
        }
    }
}
</script>
<style lang="scss" module>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 80px;

 font-family: EB Garamond, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;



    
}

.logoBlock {
    display: flex;
    align-items: center;
}

.logoTitle {
    margin-left: 0.5rem;
    font-size: 1.8rem;
}

.nav {
    display: flex;
    font-size: 1.4rem;

    a + a {
        margin-left: 1rem;
    }
}

.link {
    text-decoration: none;
    color: #333;
    transition: 0.25s color;
    &:hover {
      color: #e42626;
    }
}

.activeLink {
    color: #e42626;
}
</style>
