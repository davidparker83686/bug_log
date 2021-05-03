      <div class="col-3 d-inline ">
        <img
          :src="note.creator.picture"
          alt="user photo"
          height="20"
          class="rounded-circle px-2"
        />
        {{ (note.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (note.creator.name.split('@')[0]).substring(1) }}
      </div>
