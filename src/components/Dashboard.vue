<template>
    <div id='dashboard'>
        <nav class="navbar navbar-expand-md navbar-dark navbar-laravel">
            <div class="container">
                <router-link to="/" class="navbar-brand">
                    Fuel Inventory App
                </router-link>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <router-link to='/'>Home</router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to='/dispensers'>Dispensers</router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to='/dispensers/create'>Create Dispenser</router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to='/tanks'>Tanks</router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to='/tanks/create'>Create Tank</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-8" style="padding-top:2rem">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>